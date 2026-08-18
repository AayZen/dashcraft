import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { AppShell } from "../layouts/AppShell";
import Home from "../pages/Home/Home";
import Builder from "../pages/Builder/Builder";
import { DashboardsList } from "../pages/Dashboards/DashboardsList";
import { TemplatesPage } from "../pages/Templates/TemplatesPage";
import { About } from "../pages/About/About";
import { PreviewMode } from "../components/preview/PreviewMode";
import { NotFound } from "../pages/NotFound/NotFound";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Shell pages with top navbar */}
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="dashboards" element={<DashboardsList />} />
            <Route path="dashboard" element={<Navigate to="/dashboards" replace />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Dedicated Fullscreen Builder Studio */}
          <Route path="builder" element={<Builder />} />
          <Route path="builder/:id" element={<Builder />} />

          {/* Dedicated Presentation Preview Mode */}
          <Route path="preview/:id" element={<PreviewMode />} />

          {/* 404 — render a proper not-found page instead of silently redirecting */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;