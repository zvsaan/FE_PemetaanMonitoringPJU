/* eslint-disable */
import React, { Component } from 'react';

import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import DataPju from 'parts/Admin/InformasiPJU/DataPJU';

export default class DataPJUPage extends Component {
  state = {
    isOpen: false,
  };

  toggleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="flex overflow-hidden"> {/* prevent scroll on main content */}
        {/* Sidebar */}
        <SidebarAdmin isOpen={this.state.isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen overflow-y-auto">
          {/* Header */}
          <HeaderAdmin toggleSidebar={this.toggleSidebar} />

          {/* Main Dashboard Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-blue-700">Data PJU</h1>
            <div className="overflow-x-auto"> {/* make table scrollable horizontally */}
              <DataPju />
            </div>
          </main>
        </div>
      </div>
    );
  }
}