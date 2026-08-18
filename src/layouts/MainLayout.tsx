import React from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "../hooks/useToast";

const MainLayout: React.FC = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <Outlet />
      </div>
    </ToastProvider>
  );
};

export default MainLayout;