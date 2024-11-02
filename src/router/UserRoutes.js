import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/users/Home/Home";
import DataPengaduan from "../pages/users/InformasiPJU/DataPengaduan";
import DataTablePJU from "../pages/users/InformasiPJU/DataTablePJU";
import VisualisasiMaps from "../pages/users/InformasiPJU/VisualisasiMaps";
import Contact from "../pages/users/Contact/Contact";
import About from "../pages/users/About/About";
import NotFoundLayout from "../screens/NotFoundLayout";

import Coba from "../pages/users/InformasiPJU/Coba";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/viewmaps" element={<VisualisasiMaps />} />
      <Route path="/tabeldatapju" element={<DataTablePJU />} />
      <Route path="/pengaduan" element={<DataPengaduan />} />
      <Route path="/hubungikami" element={<Contact />} />
      <Route path="/tentangkami" element={<About />} />

      <Route path="/coba" element={<Coba />} />
      
      <Route path="*" element={<NotFoundLayout />} />
    </Routes>
  );
}