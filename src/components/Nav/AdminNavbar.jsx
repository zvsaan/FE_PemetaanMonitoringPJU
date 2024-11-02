import React from "react";

export default function AdminNavbar({ toggleSidebar }) {
  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-toggle" onClick={toggleSidebar}>
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
    </nav>
  );
}