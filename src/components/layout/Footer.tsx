const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center text-slate-400 md:flex-row">
        <div>
          <h3 className="text-lg font-bold text-white">
            DashCraft
          </h3>

          <p className="text-sm">
            Craft Dashboards Visually
          </p>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} DashCraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;