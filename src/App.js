import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import UserLayout from "./screens/UserLayout";
import AdminLayout from "./screens/AdminLayout"; 
import LoginLayout from "./screens/LoginLayout";
import NotFoundLayout from "./screens/NotFoundLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
      </Helmet>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/admin/login" element={<LoginLayout />} /> 

        <Route path="/*" element={<UserLayout />} />

        <Route path="/404" element={<NotFoundLayout />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}