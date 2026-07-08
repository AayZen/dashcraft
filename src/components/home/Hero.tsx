import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
        AI-Powered Dashboard Builder
      </span>

      <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
        Craft Beautiful Dashboards
        <br />
        <span className="text-cyan-400">Without Writing Code</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-slate-400">
        Generate dashboards using AI, customize them visually, and build
        responsive analytics interfaces in minutes.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          to="/builder"
          className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
        >
          Start Building
        </Link>

        <button className="rounded-xl border border-slate-700 px-8 py-4 hover:bg-slate-800">
          Live Demo
        </button>
      </div>
    </section>
  );
};

export default Hero;