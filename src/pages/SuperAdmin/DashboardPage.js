/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faUsers, faUserTie, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import SidebarSuperAdmin from 'parts/SidebarSuperAdmin';
import HeaderSuperAdmin from 'parts/HeaderSuperAdmin';
import axios from 'axios'; // Import axios for API calls
import CountUp from 'react-countup'; // Importing react-countup

export default class DashboardPageSuperAdmin extends Component {
  state = {
    isOpen: true,
    dashboardData: {
      userdata_count: 0,
      admin_count: 0,
      dishub_count: 0,
      visitor_count: 0,
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchDashboardData(); // Initial fetch
    this.interval = setInterval(this.fetchDashboardData, 30000); // Polling setiap 30 detik
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchDashboardData = () => {
    const authToken = localStorage.getItem('authToken'); // Pastikan auth token tersedia
    if (authToken) {
      axios
        .get('http://localhost:8000/api/superadmin/dashboard-data', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          this.setState({ dashboardData: response.data.data });
        })
        .catch((error) => {
          console.error('Error fetching dashboard data:', error);
        });
    } else {
      console.error('No auth token found in localStorage');
    }
  };

  toggleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen, dashboardData } = this.state;

    return (
      <div className="flex">
        {/* Sidebar */}
        <SidebarSuperAdmin isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Overlay (for Mobile) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-1000 md:hidden"
            onClick={this.toggleSidebar}
          ></div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 min-h-screen transition-all duration-300 ${isOpen ? 'md:ml-64' : 'ml-0'}`}
        >
          {/* Header */}
          <HeaderSuperAdmin />

          {/* Main Dashboard Content */}
          <main className="p-4 sm:p-6 w-full">
            <h1 className="text-3xl font-bold text-purple-600">Super Admin Dashboard</h1>
            <p>Selamat datang di panel Super Admin!</p>

            {/* Report Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {/* Total Data */}
              <ReportCard
                icon={<FontAwesomeIcon icon={faUserShield} />}
                title="Total Data Users"
                number={dashboardData.userdata_count}
                bgColor="bg-green-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faUsers} />}
                title="Total Admin"
                number={dashboardData.admin_count}
                bgColor="bg-blue-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faUserTie} />}
                title="Total Dishub"
                number={dashboardData.dishub_count}
                bgColor="bg-orange-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faUserAlt} />}
                title="Total Visitor"
                number={dashboardData.visitor_count}
                bgColor="bg-purple-500"
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

const ReportCard = ({ icon, title, number, bgColor }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center text-center">
      <div
        className={`${bgColor} text-white rounded-lg p-3 md:p-4 text-2xl md:text-3xl mb-2`}
      >
        {icon}
      </div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-lg md:text-2xl font-bold">
        <CountUp start={0} end={number} duration={2.5} separator="," />
      </p>
    </div>
  );
};
