/* eslint-disable */
import React, { Component } from 'react';

import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import Pengaduan from 'parts/Admin/Pengaduan/Pengaduan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class DataPengaduanPage extends Component {
  state = {
    isOpen: true,
  };

  toggleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className="flex overflow-hidden relative">
        {/* Sidebar */}
        <SidebarAdmin isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Overlay untuk Mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-2000 ease-in-out"
            onClick={this.toggleSidebar}
          ></div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${
            isOpen ? 'md:ml-64 ml-0' : 'ml-0'
          }`}
        >
          {/* Header */}
          <HeaderAdmin />

          {/* Main Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-blue-700">Data Pengaduan Masyarakat</h1>
            <div className="overflow-x-auto">
              <Pengaduan />
            </div>
          </main>
        </div>

        {/* Floating Button */}
        <button
          onClick={this.toggleSidebar}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    );
  }
}
