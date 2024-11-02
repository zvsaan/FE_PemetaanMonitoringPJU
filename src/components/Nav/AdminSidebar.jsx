import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaUser, FaCalendarAlt, FaCog, FaSignOutAlt, FaBars, FaChevronDown, FaChevronUp, FaLightbulb, FaExclamationCircle, FaChartLine } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  margin: 15px;
  width: 250px;
  height: 96vh;
  background-color: #7165D6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 25px;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 768px) {
    left: ${props => (props.isOpen ? '0' : '-100%')};
  }
`;

const MenuIcon = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 30px;
  color: #7165D6;
  cursor: pointer;
  z-index: 2000;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  margin-bottom: 40px;
`;

const MenuItem = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 15px;
  text-decoration: none;
  background-color: ${props => (props.active ? '#fff' : 'transparent')};
  color: ${props => (props.active ? '#7165D6' : '#fff')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #7165D6;
  }
`;

const IconWrapper = styled.div`
  margin-right: 15px;
`;

const MenuText = styled.span`
  font-size: 16px;
`;

const LogoutContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const SubMenuContainer = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-left: 20px;
`;

const ArrowIcon = styled.div`
  margin-left: auto; /* Untuk mendorong panah ke kanan */
  padding-left: 10px; /* Beri jarak antara teks dan ikon */
`;

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <>
      <MenuIcon onClick={toggleSidebar}>
        <FaBars />
      </MenuIcon>

      <SidebarContainer isOpen={isOpen}>
        <div>
          <Logo>PT TTMT</Logo>
          <MenuItem to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} onClick={toggleSidebar}>
            <IconWrapper>
              <FaHome size={20} />
            </IconWrapper>
            <MenuText>Dashboard</MenuText>
          </MenuItem>

          {/* Menu Informasi Data dengan Sub-menu */}
          <MenuItem as="div" onClick={toggleSubMenu}>
            <IconWrapper>
              <FaUser size={20} />
            </IconWrapper>
            <MenuText>Informasi Data</MenuText>
            <ArrowIcon>
              {isSubMenuOpen ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
            </ArrowIcon>
          </MenuItem>
          <SubMenuContainer isOpen={isSubMenuOpen}>
            <MenuItem to="/admin/data-pju" active={location.pathname === '/admin/data-pju'} onClick={toggleSidebar}>
              <IconWrapper>
                <FaLightbulb size={16} />
              </IconWrapper>
              <MenuText>Data PJU</MenuText>
            </MenuItem>
            <MenuItem to="/admin/data-pengaduan" active={location.pathname === '/admin/data-pengaduan'} onClick={toggleSidebar}>
              <IconWrapper>
                <FaExclamationCircle size={16} />
              </IconWrapper>
              <MenuText>Data Pengaduan</MenuText>
            </MenuItem>
            <MenuItem to="/admin/monitoring-pju" active={location.pathname === '/admin/monitoring-pju'} onClick={toggleSidebar}>
              <IconWrapper>
                <FaChartLine size={16} />
              </IconWrapper>
              <MenuText>Monitoring PJU</MenuText>
            </MenuItem>
          </SubMenuContainer>

          <MenuItem to="/admin/settings" active={location.pathname === '/admin/settings'} onClick={toggleSidebar}>
            <IconWrapper>
              <FaCog size={20} />
            </IconWrapper>
            <MenuText>Settings</MenuText>
          </MenuItem>
        </div>
        <LogoutContainer>
          <MenuItem to="/logout" onClick={toggleSidebar}>
            <IconWrapper>
              <FaSignOutAlt size={20} />
            </IconWrapper>
            <MenuText>Logout</MenuText>
          </MenuItem>
        </LogoutContainer>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;