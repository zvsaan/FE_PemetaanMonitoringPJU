/* eslint-disable */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faHistory,
  faMapMarkerAlt,
  faLightbulb,
  faPlug,
  faTools,
  faBuilding,
  faUsers,
  faNewspaper,
  faTimes,
  faBars,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SidebarVisitor = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState('');

  const toggleSubMenu = (menu) => {
    setOpenMenu((prevMenu) => (prevMenu === menu ? '' : menu));
  };

  const MenuItem = ({ label, icon, children, menuKey }) => (
    <div>
      <button
        onClick={() => toggleSubMenu(menuKey)}
        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-green-600 transition"
      >
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={icon} />
          <span>{label}</span>
        </div>
        <FontAwesomeIcon icon={openMenu === menuKey ? faAngleUp : faAngleDown} />
      </button>
      {openMenu === menuKey && <div className="ml-6 mt-2 space-y-2">{children}</div>}
    </div>
  );

  return (
    <>
      {/* Sidebar */}
      <div
  className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-500 to-green-700 text-white shadow-lg transform ${
    isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
  } transition-all duration-500 ease-in-out z-50`}
>
        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="text-2xl font-bold mb-6">SiGAP</div>
            <nav className="flex flex-col space-y-4 w-full">
              <Link to="/v1/visitor/home" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-600 transition">
                <FontAwesomeIcon icon={faTachometerAlt} />
                <span>Dashboard</span>
              </Link>

              <MenuItem label="Kelola Data" icon={faTools} menuKey="manajemenData">
                <Link to="/v1/visitor/paneldata" className="block p-2 rounded-lg hover:bg-green-500 transition">
                  <FontAwesomeIcon icon={faPlug} /> Data Panel
                </Link>
                <Link to="/v1/visitor/apjdata" className="block p-2 rounded-lg hover:bg-green-500 transition">
                  <FontAwesomeIcon icon={faLightbulb} /> Data APJ
                </Link>
                <Link to="/v1/visitor/konstruksidata" className="block p-2 rounded-lg hover:bg-green-500 transition">
                  <FontAwesomeIcon icon={faLightbulb} /> Data Konstruksi
                </Link>
              </MenuItem>

              <MenuItem label="Pemetaan" icon={faMapMarkerAlt} menuKey="pemetaanPJU">
                <Link to="/v1/visitor/panelpemetaan" className="block p-2 rounded-lg hover:bg-green-500 transition">
                  <FontAwesomeIcon icon={faPlug} /> Pemetaan Panel
                </Link>
                <Link to="/v1/visitor/apjpemetaan" className="block p-2 rounded-lg hover:bg-green-500 transition">
                  <FontAwesomeIcon icon={faLightbulb} /> Pemetaan APJ
                </Link>
              </MenuItem>
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay untuk Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-700 transition"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
    </>
  );
};

export default SidebarVisitor;