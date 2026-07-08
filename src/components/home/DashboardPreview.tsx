const DashboardPreview = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="text-center">
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
          Live Preview
        </span>

        <h2 className="mt-6 text-5xl font-bold text-white">
          Build Beautiful Dashboards
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Design dashboards visually using AI, drag-and-drop widgets, and
          responsive layouts.
        </p>
      </div>

      <div className="mt-20 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            Sales Dashboard
          </h3>

          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-3">
          {/* Stats */}
          <div className="rounded-2xl bg-slate-800 p-6">
            <p className="text-slate-400">Revenue</p>
            <h4 className="mt-3 text-3xl font-bold text-cyan-400">
              $98,430
            </h4>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6">
            <p className="text-slate-400">Users</p>
            <h4 className="mt-3 text-3xl font-bold text-cyan-400">
              12,842
            </h4>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6">
            <p className="text-slate-400">Orders</p>
            <h4 className="mt-3 text-3xl font-bold text-cyan-400">
              1,248
            </h4>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-800 p-6">
            <div className="mb-6 h-6 w-40 rounded bg-slate-700"></div>

            <div className="flex h-64 items-end gap-4">
              {[45, 60, 35, 90, 70, 100, 85].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-lg bg-cyan-500"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          {/* Pie */}
          <div className="flex items-center justify-center rounded-2xl bg-slate-800 p-6">
            <div className="h-44 w-44 rounded-full border-[22px] border-cyan-500 border-t-blue-500 border-r-purple-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;