/* eslint-disable */
import React, { Component } from 'react';

import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import DataRiwayatPanel from 'parts/Admin/ManageData/DataRiwayat/DataRiwayatPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class DataRiwayatPanelPage extends Component {
  state = {
    isOpen: true, // Sidebar default terbuka
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
      <div className="flex overflow-hidden">
        {/* Sidebar */}
        <SidebarAdmin isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Main Content Area */}
        <div
          className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${
            isOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {/* Header */}
          <HeaderAdmin />

          {/* Main Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-blue-700">Data Riwayat Panel</h1>
            <div className="overflow-x-auto">
              <DataRiwayatPanel />
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