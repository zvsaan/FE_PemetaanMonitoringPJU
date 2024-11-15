/* eslint-disable */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMapMarkerAlt, faLightbulb, faPlug, faNewspaper, faCog, faUserCog, faTools, faTimes, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  // State to track open sub-menus
  const [openMenu, setOpenMenu] = useState({
    dataPemetaan: false,
    informasiPJU: false,
    informasiPanel: false,
    informasiWebsite: false,
    pengaturan: false,
  });

  // Toggle function for sub-menus
  const toggleSubMenu = (menu) => {
    setOpenMenu((prevMenu) => ({
      ...prevMenu,
      [menu]: !prevMenu[menu],
    }));
  };

  return (
    <div
      className={`sidebar fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 md:h-[calc(100vh-2rem)] md:ml-4 md:mt-4 md:mb-4 rounded-2xl`}
    >
      {/* Close Button for Mobile */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden text-white rounded-full p-2 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} className="text-lg" />
        </button>
      )}

      <div className="p-6">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-2xl font-bold mb-6">PT TTMT</div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 w-full">
            {/* Dashboard */}
            <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition">
              <FontAwesomeIcon icon={faChartLine} />
              <span>Dashboard</span>
            </Link>

            {/* Data Pemetaan */}
            <div>
              <button
                onClick={() => toggleSubMenu('dataPemetaan')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-600 transition"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>Data Pemetaan</span>
                </div>
                <FontAwesomeIcon icon={openMenu.dataPemetaan ? faAngleUp : faAngleDown} />
              </button>
              {openMenu.dataPemetaan && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/admin/pemetaan-pju" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Pemetaan PJU
                  </Link>
                  <Link to="/admin/pemetaan-panel" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Pemetaan Panel
                  </Link>
                </div>
              )}
            </div>

            {/* Informasi PJU */}
            <div>
              <button
                onClick={() => toggleSubMenu('informasiPJU')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-600 transition"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faLightbulb} />
                  <span>Informasi PJU</span>
                </div>
                <FontAwesomeIcon icon={openMenu.informasiPJU ? faAngleUp : faAngleDown} />
              </button>
              {openMenu.informasiPJU && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/admin/data-pju" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Data PJU
                  </Link>
                  <Link to="/admin/riwayat-pju" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Riwayat PJU
                  </Link>
                </div>
              )}
            </div>

            {/* Informasi Panel */}
            <div>
              <button
                onClick={() => toggleSubMenu('informasiPanel')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-600 transition"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faPlug} />
                  <span>Informasi Panel</span>
                </div>
                <FontAwesomeIcon icon={openMenu.informasiPanel ? faAngleUp : faAngleDown} />
              </button>
              {openMenu.informasiPanel && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/admin/data-panel" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Data Panel
                  </Link>
                  <Link to="/admin/riwayat-panel" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Riwayat Panel
                  </Link>
                </div>
              )}
            </div>

            {/* Informasi Website */}
            <div>
              <button
                onClick={() => toggleSubMenu('informasiWebsite')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-600 transition"
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faNewspaper} />
                  <span>Data Company</span>
                </div>
                <FontAwesomeIcon icon={openMenu.informasiWebsite ? faAngleUp : faAngleDown} />
              </button>
              {openMenu.informasiWebsite && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/admin/data-team" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Data Tim
                  </Link>
                  <Link to="/admin/data-berita" className="block p-2 rounded-lg hover:bg-blue-500 transition">
                    Berita Terkini
                  </Link>
                </div>
              )}
            </div>
             
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
