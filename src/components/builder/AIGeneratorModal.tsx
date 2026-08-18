import React, { useState } from "react";
import { Loader2, AlertCircle, Wand2, Info, Sparkles } from "lucide-react";
import { Modal } from "../common/Modal";
import { api, type GenerationResult } from "../../services/api";
import { LogoMark } from "../brand/Logo";

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedDashboard: (
    generated: GenerationResult["dashboard"],
    source: "ai_generated" | "synthesized_demo"
  ) => void;
}

const PROMPT_SUGGESTIONS = [
  {
    category: "SaaS",
    prompt: "Create a SaaS revenue dashboard with MRR, ARR, churn rate, plan mix, and expansion accounts.",
  },
  {
    category: "E-Commerce",
    prompt: "Build an e-commerce retail dashboard for store revenue, average order value, conversion rate, and top selling SKUs.",
  },
  {
    category: "DevOps",
    prompt: "Design a cloud infrastructure health dashboard with API P99 latency, CPU utilization, 5xx errors, and uptime status.",
  },
  {
    category: "Marketing",
    prompt: "Generate a marketing pipeline dashboard with CAC, ROAS, qualified inbound leads, and campaign conversion funnels.",
  },
  {
    category: "Finance",
    prompt: "Create a company treasury dashboard with cash runway, gross margins, net burn rate, and operating cash flow.",
  },
  {
    category: "Product",
    prompt: "Build a product telemetry dashboard showing DAU/MAU retention, session durations, and feature adoption metrics.",
  },
];

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedDashboard,
}) => {
  const [prompt, setPrompt] = useState(PROMPT_SUGGESTIONS[0].prompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState<string>("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setErrorNotice(null);
    setGenerationStep("Understanding your dashboard...");

    const t1 = setTimeout(() => {
      setGenerationStep("Designing widgets and metrics...");
    }, 450);

    const t2 = setTimeout(() => {
      setGenerationStep("Preparing your layout and visualization series...");
    }, 900);

    try {
      const result = await api.generateDashboard(prompt);

      clearTimeout(t1);
      clearTimeout(t2);
      setGenerationStep("Finalizing dashboard layout...");

      setTimeout(() => {
        onApplyGeneratedDashboard(result.dashboard, result.source);
        setIsGenerating(false);
        onClose();
      }, 300);
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      console.error(err);
      setErrorNotice(
        err instanceof Error ? err.message : "Failed to generate dashboard with AI."
      );
      setIsGenerating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="DashCraft AI Dashboard Generator"
      description="Describe your target metrics and DashCraft will synthesize a fully editable dashboard."
      maxWidth="2xl"
      icon={<LogoMark className="h-5 w-5" size={20} idSuffix="ai-modal" />}
    >
      <div className="space-y-4">
        {/* Prompt Input Box */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
            Describe the dashboard you want
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setErrorNotice(null);
            }}
            placeholder="e.g. Create a B2B SaaS dashboard tracking MRR, cohort retention, CAC, and enterprise deals..."
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-cyan-500 transition-colors duration-150 resize-none leading-relaxed"
          />
        </div>

        {/* Suggestion Chips */}
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Suggested Presets
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.category}
                onClick={() => setPrompt(item.prompt)}
                className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-left text-xs active:scale-[0.98] transition-all duration-150 ${
                  prompt === item.prompt
                    ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-850/50 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span className="shrink-0 font-mono text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {item.category}
                </span>
                <span className="line-clamp-2 leading-tight">{item.prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Error Notice if any */}
        {errorNotice && (
          <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-700 dark:text-rose-300 animate-in-scale">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Generation Notice</p>
              <p className="mt-0.5 text-rose-600 dark:text-rose-400">{errorNotice}</p>
            </div>
          </div>
        )}

        {/* Status indicator during generation */}
        {isGenerating && (
          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/40 bg-cyan-50/80 dark:bg-cyan-950/60 p-4 text-xs text-cyan-900 dark:text-cyan-100 animate-in-scale shadow-sm">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-zinc-950 shadow-xs">
              <Sparkles className="h-4 w-4 animate-spin" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-xs text-cyan-950 dark:text-cyan-50">Synthesizing Architecture</p>
              <p className="mt-0.5 text-[11px] text-cyan-700 dark:text-cyan-300 font-medium transition-all duration-200">
                {generationStep}
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800/80 mt-6">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
            <Info className="h-3.5 w-3.5" />
            <span>Works with OpenAI or built-in Studio Synthesizer</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-150"
            >
              Cancel
            </button>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 active:scale-95 disabled:opacity-50 px-4 py-2 text-xs font-semibold text-zinc-950 transition-all duration-150 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>Generate Dashboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
