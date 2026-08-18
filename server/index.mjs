import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import OpenAI from "openai";

loadLocalEnv();

const PORT = Number(process.env.PORT ?? 8787);
const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const accents = ["cyan", "blue", "emerald", "violet", "amber", "rose", "indigo", "zinc"];
const kinds = [
  "kpi",
  "line",
  "bar",
  "area",
  "donut",
  "table",
  "progress",
  "gauge",
  "heading",
  "text",
  "status",
  "activity",
];
const sizes = ["sm", "md", "lg", "full"];

const dashboardSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "widgets"],
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    widgets: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["kind", "title", "metric", "change", "size", "accent", "data"],
        properties: {
          kind: {
            type: "string",
            enum: kinds,
          },
          title: {
            type: "string",
          },
          subtitle: {
            type: "string",
          },
          metric: {
            type: "string",
          },
          change: {
            type: "string",
          },
          changePeriod: {
            type: "string",
          },
          size: {
            type: "string",
            enum: sizes,
          },
          accent: {
            type: "string",
            enum: accents,
          },
          data: {
            type: "array",
            items: {
              type: "number",
            },
          },
          labels: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method === "GET" && request.url === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      hasApiKey: Boolean(process.env.OPENAI_API_KEY),
      model: MODEL,
    });
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/generate-dashboard") {
    sendJson(response, 404, { error: "Route not found" });
    return;
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      sendJson(response, 503, {
        error:
          "OPENAI_API_KEY is not configured in .env. Falling back to DashCraft Studio Synthesizer.",
        fallback: true,
      });
      return;
    }

    const body = await readJsonBody(request);
    const prompt = String(body.prompt ?? "").trim();

    if (prompt.length < 4) {
      sendJson(response, 400, {
        error: "Please describe the dashboard you want in a few words.",
      });
      return;
    }

    const dashboard = await generateDashboard(prompt);
    sendJson(response, 200, {
      ...dashboard,
      model: MODEL,
      source: "ai_generated",
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    sendJson(response, 500, {
      error:
        error instanceof Error
          ? error.message
          : "DashCraft could not generate a dashboard via OpenAI.",
      fallback: true,
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`DashCraft AI API listening on http://127.0.0.1:${PORT}`);
});

async function generateDashboard(prompt) {
  const client = new OpenAI();
  
  const completion = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are DashCraft's expert analytics AI designer. Create cohesive, high-impact, realistic business and engineering dashboards. Return only schema-valid JSON. Include 6 to 8 varied widgets with realistic numbers, percentage changes, labels, and normalized 0-100 chart data arrays.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "dashcraft_dashboard",
        strict: true,
        schema: dashboardSchema,
      },
    },
    max_tokens: 2400,
  });

  const raw = completion.choices[0]?.message?.content;

  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  const parsed = JSON.parse(raw);

  return {
    title: cleanText(parsed.title, "Analytics Dashboard", 80),
    description: cleanText(parsed.description, `Generated dashboard for: ${prompt}`, 180),
    widgets: (parsed.widgets || [])
      .slice(0, 10)
      .map((widget, index) => sanitizeWidget(widget, index)),
  };
}

function sanitizeWidget(widget, index) {
  const kind = kinds.includes(widget.kind) ? widget.kind : "kpi";
  const size = sizes.includes(widget.size)
    ? widget.size
    : kind === "kpi" || kind === "progress" || kind === "gauge"
    ? "sm"
    : "md";
  const accent = accents.includes(widget.accent) ? widget.accent : accents[index % accents.length];
  const data = Array.isArray(widget.data)
    ? widget.data
        .map((value) => Number(value))
        .filter(Number.isFinite)
        .slice(0, 12)
        .map((value) => Math.max(0, Math.min(100, Math.round(value))))
    : [28, 45, 68, 84];

  const labels = Array.isArray(widget.labels)
    ? widget.labels.map((l) => String(l).slice(0, 20))
    : ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"];

  return {
    id: `ai-${Date.now()}-${index}-${kind}`,
    kind,
    title: cleanText(widget.title, "Metric Overview", 50),
    subtitle: widget.subtitle ? cleanText(widget.subtitle, "", 60) : undefined,
    metric: cleanText(widget.metric, "0", 24),
    change: cleanText(widget.change, "+0%", 20),
    changePeriod: widget.changePeriod ? cleanText(widget.changePeriod, "vs last month", 30) : "vs last month",
    changeType: "increase",
    size,
    accent,
    data: data.length >= 3 ? data : [24, 48, 72],
    labels,
  };
}

function cleanText(value, fallback, maxLength) {
  const text = String(value ?? "").trim();
  return (text || fallback).slice(0, maxLength);
}

function readJsonBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 32_768) {
        rejectBody(new Error("Request body exceeds size limit."));
        request.destroy();
      }
    });

    request.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        rejectBody(new Error("Request body must be valid JSON."));
      }
    });

    request.on("error", rejectBody);
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });

  if (status === 204) {
    response.end();
    return;
  }

  response.end(JSON.stringify(payload));
}

function loadLocalEnv() {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  }
}
