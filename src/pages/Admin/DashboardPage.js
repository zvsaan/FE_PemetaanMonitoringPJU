/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCheckCircle, faTimesCircle, faTools, faBars } from '@fortawesome/free-solid-svg-icons';
import 'react-calendar/dist/Calendar.css';
import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import AdminImage from '../../assets/images/admin.png';
import axios from 'axios'; // Import axios for API calls
import AnalysisCard from 'parts/Admin/Analystic/AnalysisCard';
import ProblemPercentageCard from 'parts/Admin/Analystic/ProblemPercentageCard';
import CountUp from 'react-countup'; // Importing react-countup

export default class DashboardPage extends Component {
  state = {
    isOpen: true,
    dashboardData: {
      total_pju: 0,
      total_panel: 0,
      total_riwayat_pju: 0,
      total_riwayat_panel: 0,
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    // Cek apakah data sudah ada di localStorage
    const storedData = localStorage.getItem('dashboardData');
    if (storedData) {
      // Jika ada, gunakan data yang sudah disimpan
      this.setState({ dashboardData: JSON.parse(storedData) });
    } else {
      // Jika belum ada di localStorage, ambil data dari API
      this.fetchDashboardData();
    }
  }

  fetchDashboardData = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      axios.get('http://localhost:8000/api/dashboard-data', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        const dashboardData = response.data;
        // Simpan data ke localStorage
        localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        // Update state dengan data terbaru
        this.setState({ dashboardData });
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
        <SidebarAdmin isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

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
          <HeaderAdmin />

          {/* Main Dashboard Content */}
          <main className="p-4 sm:p-6 w-full">
            <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
            <p>Selamat datang di panel admin!</p>

            {/* Welcome Card */}
            <div className="bg-purple-600 text-white rounded-xl p-6 flex items-center relative mt-6 mb-6">
              <img
                src={AdminImage}
                alt="Admin"
                className="w-16 h-16 md:w-32 md:h-auto absolute left-4 md:left-0 transform -translate-y-1/4"
              />
              <div className="ml-24 md:ml-36">
                <h2 className="text-xl md:text-2xl font-bold">
                  Welcome, Admin TTMT
                </h2>
                <p>Have a nice day at work</p>
              </div>
            </div>

            {/* Report Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard
                icon={<FontAwesomeIcon icon={faLightbulb} />}
                title="Total APJ"
                number={dashboardData.total_pju}
                bgColor="bg-indigo-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faCheckCircle} />}
                title="Total Panel"
                number={dashboardData.total_panel}
                bgColor="bg-teal-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faTimesCircle} />}
                title="Riwayat APJ"
                number={dashboardData.total_riwayat_pju}
                bgColor="bg-red-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faTools} />}
                title="Riwayat Panel"
                number={dashboardData.total_riwayat_panel}
                bgColor="bg-orange-400"
              />
            </div>

            {/* Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Left Side: AnalysisCard */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Analysis</h2>
                <AnalysisCard />
              </div>

              {/* Right Side: ProblemPercentageCard */}
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Problem Percentage</h2>
                <ProblemPercentageCard />
              </div>
            </div>
          </main>
        </div>

        {/* Floating Button */}
        <button
          onClick={this.toggleSidebar}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-blue-700 transition md:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    );
  }
}

// Component untuk ReportCard dengan CountUp
const ReportCard = ({ icon, title, number, bgColor }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center text-center">
    <div
      className={`${bgColor} text-white rounded-lg p-3 md:p-4 text-2xl md:text-3xl mb-2`}
    >
      {icon}
    </div>
    <h4 className="text-sm font-semibold">{title}</h4>
    <p className="text-lg md:text-2xl font-bold">
      {/* Apply CountUp to animate the number */}
      <CountUp start={0} end={number} duration={2.5} separator="," />
    </p>
  </div>
)