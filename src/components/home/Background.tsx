const Background = () => {
  return (
    <>
      {/* Main Background */}
      <div className="fixed inset-0 -z-50 bg-slate-950" />

      {/* Top Glow */}
      <div className="fixed left-1/2 top-0 -z-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="fixed bottom-0 right-0 -z-40 h-[350px] w-[350px] rounded-full bg-blue-600/15 blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 -z-30 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </>
  );
};

export default Background;