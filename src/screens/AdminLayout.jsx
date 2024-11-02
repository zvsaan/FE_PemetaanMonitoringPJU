// AdminLayout.js
import React, { useState } from "react";
import AdminSidebar from "../components/Nav/AdminSidebar";
import AdminRoutes from "../router/AdminRoutes";
import styled from "styled-components";

// LayoutContainer mengatur Sidebar dan Konten
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Kontainer untuk konten utama
const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: ${props => (props.isSidebarOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;


export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      {/* Sidebar menerima isOpen dari state */}
      <AdminSidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <ContentContainer isSidebarOpen={isSidebarOpen}>
        <AdminRoutes />
      </ContentContainer>
    </LayoutContainer>
  );
}