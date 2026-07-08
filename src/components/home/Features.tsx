import {
  Sparkles,
  LayoutDashboard,
  BarChart3,
  MousePointerClick,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "AI Dashboard Generation",
    description:
      "Describe your dashboard in plain English and let AI build the layout.",
    icon: Sparkles,
  },
  {
    title: "Drag & Drop Builder",
    description:
      "Rearrange widgets visually without writing code.",
    icon: MousePointerClick,
  },
  {
    title: "Interactive Charts",
    description:
      "Create beautiful Line, Bar, Pie, and Area charts instantly.",
    icon: BarChart3,
  },
  {
    title: "Responsive Layouts",
    description:
      "Dashboards automatically adapt to desktop, tablet, and mobile devices.",
    icon: LayoutDashboard,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white">
          Everything You Need
        </h2>

        <p className="mt-4 text-lg text-slate-400">
          Powerful features to build modern dashboards in minutes.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-500"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                <Icon className="h-6 w-6 text-cyan-400" />
              </div>

              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;