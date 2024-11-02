import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Monitoring from "../pages/admin/Monitoring/Monitoring";
import MapsView from "../pages/admin/MapsView/MapsView"
import Setting from "../pages/admin/Setting/Setting";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/monitoring" element={<Monitoring />} />
      <Route path="/mapsview" element={<MapsView />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  );
}