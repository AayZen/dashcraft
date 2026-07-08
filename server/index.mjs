import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import OpenAI from "openai";

loadLocalEnv();

const PORT = Number(process.env.PORT ?? 8787);
const MODEL = process.env.OPENAI_MODEL ?? "gpt-5.5";
const accents = ["cyan", "emerald", "violet", "amber", "rose", "sky"];
const kinds = ["kpi", "line", "bar", "donut", "table"];
const sizes = ["sm", "md", "lg"];

const dashboardSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "widgets"],
  properties: {
    title: {
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
          metric: {
            type: "string",
          },
          change: {
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
          "OPENAI_API_KEY is not configured. Create .env from .env.example and restart npm run dev.",
      });
      return;
    }

    const body = await readJsonBody(request);
    const prompt = String(body.prompt ?? "").trim();

    if (prompt.length < 8) {
      sendJson(response, 400, {
        error: "Describe the dashboard you want in at least a few words.",
      });
      return;
    }

    const dashboard = await generateDashboard(prompt);
    sendJson(response, 200, dashboard);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, {
      error:
        error instanceof Error
          ? error.message
          : "DashCraft could not generate a dashboard.",
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`DashCraft AI API listening on http://127.0.0.1:${PORT}`);
});

async function generateDashboard(prompt) {
  const client = new OpenAI();
  const result = await client.responses.create({
    model: MODEL,
    max_output_tokens: 1800,
    input: [
      {
        role: "developer",
        content:
          "You generate polished analytics dashboard layouts for DashCraft. Return only schema-valid JSON. Choose widget titles, metrics, short change labels, sizes, accent colors, and 0-100 chart data that match the user's domain.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "dashcraft_dashboard",
        strict: true,
        schema: dashboardSchema,
      },
    },
  });

  const raw = result.output_text;

  if (!raw) {
    throw new Error("The model returned an empty dashboard.");
  }

  const parsed = JSON.parse(raw);

  return {
    title: cleanText(parsed.title, "Untitled Dashboard", 80),
    widgets: parsed.widgets
      .slice(0, 8)
      .map((widget, index) => sanitizeWidget(widget, index)),
  };
}

function sanitizeWidget(widget, index) {
  const kind = kinds.includes(widget.kind) ? widget.kind : "kpi";
  const size = sizes.includes(widget.size) ? widget.size : kind === "kpi" ? "sm" : "md";
  const accent = accents.includes(widget.accent) ? widget.accent : accents[index % accents.length];
  const data = Array.isArray(widget.data)
    ? widget.data
        .map((value) => Number(value))
        .filter(Number.isFinite)
        .slice(0, 10)
        .map((value) => Math.max(0, Math.min(100, Math.round(value))))
    : [];

  return {
    id: `ai-${index}-${kind}`,
    kind,
    title: cleanText(widget.title, "Untitled Widget", 48),
    metric: cleanText(widget.metric, "0", 24),
    change: cleanText(widget.change, "+0%", 24),
    size,
    accent,
    data: data.length >= 3 ? data : [24, 48, 72],
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

      if (body.length > 16_384) {
        rejectBody(new Error("Request body is too large."));
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
    "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
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
