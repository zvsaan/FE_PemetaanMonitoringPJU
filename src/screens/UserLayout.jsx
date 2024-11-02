import React from "react";
// Components
import TopNavbar from "../components/Nav/TopNavbar";
import Footer from "../components/Sections/Footer";
// Routes
import UserRoutes from "../router/UserRoutes";

export default function UserLayout() {
  return (
    <>
      <TopNavbar />
      <div className="main-content">
        <UserRoutes />
      </div>
      <Footer />
    </>
  );
}