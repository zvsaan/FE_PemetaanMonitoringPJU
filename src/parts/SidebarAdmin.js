/* eslint-disable */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faMapMarkerAlt,
  faLightbulb,
  faPlug,
  faNewspaper,
  faTimes,
  faBars,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState({
    dataPemetaan: false,
    informasiPJU: false,
    informasiPanel: false,
    informasiWebsite: false,
  });

  const toggleSubMenu = (menu) => {
    setOpenMenu((prevMenu) => ({
      ...prevMenu,
      [menu]: !prevMenu[menu],
    }));
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-2xl font-bold mb-6">PT TTMT</div>
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 w-full">
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
              >
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
                  <FontAwesomeIcon
                    icon={openMenu.dataPemetaan ? faAngleUp : faAngleDown}
                  />
                </button>
                {openMenu.dataPemetaan && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Link
                      to="/admin/pemetaan-pju"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Pemetaan PJU
                    </Link>
                    <Link
                      to="/admin/pemetaan-panel"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
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
                  <FontAwesomeIcon
                    icon={openMenu.informasiPJU ? faAngleUp : faAngleDown}
                  />
                </button>
                {openMenu.informasiPJU && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Link
                      to="/admin/data-pju"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Data PJU
                    </Link>
                    <Link
                      to="/admin/riwayat-pju"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
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
                  <FontAwesomeIcon
                    icon={openMenu.informasiPanel ? faAngleUp : faAngleDown}
                  />
                </button>
                {openMenu.informasiPanel && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Link
                      to="/admin/data-panel"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Data Panel
                    </Link>
                    <Link
                      to="/admin/riwayat-panel"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
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
                  <FontAwesomeIcon
                    icon={openMenu.informasiWebsite ? faAngleUp : faAngleDown}
                  />
                </button>
                {openMenu.informasiWebsite && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Link
                      to="/admin/data-team"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Data Tim
                    </Link>
                    <Link
                      to="/admin/data-berita"
                      className="block p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Berita Terkini
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
    </>
  );
};

export default SidebarAdmin;