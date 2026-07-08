import {
  MessageSquareText,
  WandSparkles,
  LayoutDashboard,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    title: "Describe Your Dashboard",
    description:
      "Tell DashCraft what you want in plain English. Example: Create a sales dashboard with revenue charts and KPIs.",
  },
  {
    icon: WandSparkles,
    title: "AI Generates the Layout",
    description:
      "DashCraft converts your prompt into a structured dashboard with charts, cards, tables, and widgets.",
  },
  {
    icon: LayoutDashboard,
    title: "Customize & Export",
    description:
      "Drag, resize, and edit widgets visually. Save your dashboard or export it when you're done.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          Build Dashboards in 3 Simple Steps
        </h2>

        <p className="mt-4 text-slate-400">
          From an idea to a polished dashboard in just a few clicks.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10">
                <Icon className="h-7 w-7 text-cyan-400" />
              </div>

              <span className="text-sm font-semibold text-cyan-400">
                Step {index + 1}
              </span>

              <h3 className="mt-3 text-2xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-slate-400">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;