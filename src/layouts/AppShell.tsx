import React from "react";
import { Outlet } from "react-router-dom";
import { AppNavbar } from "../components/layout/AppNavbar";

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AppNavbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
