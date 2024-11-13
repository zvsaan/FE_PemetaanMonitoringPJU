/* eslint-disable */
import React, { Component } from 'react';

import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';

export default class PemetaanPJUPage extends Component {
  state = {
    isOpen: false,
  };

  toggleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="flex">
        {/* Sidebar */}
        <SidebarAdmin isOpen={this.state.isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <HeaderAdmin toggleSidebar={this.toggleSidebar} />

          {/* Main Dashboard Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-blue-700">Pemetaan PJU</h1>
          </main>
        </div>
      </div>
    );
  }
}