/* eslint-disable */
import React, { Component } from 'react';

import SidebarVisitor from 'parts/SidebarVisitor';
import HeaderVisitor from 'parts/HeaderVisitor';
import DataRiwayatPJU from 'parts/Visitor/ManageData/DataRiwayat/DataRiwayatPJU';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default class DataRiwayatPJUPage extends Component {
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
        <SidebarVisitor isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

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
          <HeaderVisitor />

          {/* Main Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-green-700">Data Riwayat APJ</h1>
            <div className="overflow-x-auto">
              <DataRiwayatPJU />
            </div>
          </main>
        </div>

        {/* Floating Button */}
        <button
          onClick={this.toggleSidebar}
          className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-700 transition"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    );
  }
}