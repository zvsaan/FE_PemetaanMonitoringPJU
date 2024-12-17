/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBolt, faThLarge,faHistory,faClock,faBars,faSyncAlt,faChartLine,} from "@fortawesome/free-solid-svg-icons";
import 'react-calendar/dist/Calendar.css';
import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import AdminImage from '../../assets/images/admin.png';
import axios from 'axios'; // Import axios for API calls
import AnalysisCard from 'parts/Admin/Analystic/AnalysisCard';
import ProblemPercentageCard from 'parts/Admin/Analystic/ProblemPercentageCard';
import ImportRiwayatCard from 'parts/Admin/Analystic/ImportRiwayatCard';
import ExportRiwayatCard from 'parts/Admin/Analystic/ExportRiwayatCard';
import CountUp from 'react-countup'; // Importing react-countup

export default class DashboardPage extends Component {
  state = {
    isOpen: true,
    dashboardData: {
      total_pju: 0,
      total_panel: 0,
      total_riwayat_pju: 0,
      total_riwayat_panel: 0,
      riwayat_pending_pju: 0,
      riwayat_pending_panel: 0,
      riwayat_proses_pju: 0,
      riwayat_proses_panel: 0,
      avg_riwayat_pju: 0,
      avg_riwayat_panel: 0,
    },
  };  

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchDashboardData(); // Initial fetch
    this.interval = setInterval(this.fetchDashboardData, 30000); // Polling setiap 30 detik
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Bersihkan interval saat komponen di-unmount
  }

  fetchDashboardData = () => {
    const authToken = localStorage.getItem('authToken'); // Pastikan auth token tersedia
    if (authToken) {
      axios
        .get('http://localhost:8000/api/dashboard-data', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          this.setState({ dashboardData: response.data });
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
              {/* Total Data */}
              <ReportCard
                icon={<FontAwesomeIcon icon={faBolt} />}
                title="Total APJ"
                number={dashboardData.total_pju}
                bgColor="bg-indigo-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faThLarge} />}
                title="Total Panel"
                number={dashboardData.total_panel}
                bgColor="bg-teal-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faHistory} />}
                title="Riwayat APJ"
                number={dashboardData.total_riwayat_pju}
                bgColor="bg-red-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faHistory} />}
                title="Riwayat Panel"
                number={dashboardData.total_riwayat_panel}
                bgColor="bg-orange-400"
              />

              {/* Riwayat by Status */}
              <ReportCard
                icon={<FontAwesomeIcon icon={faClock} />}
                title="Riwayat Pending PJU"
                number={dashboardData.riwayat_pending_pju}
                bgColor="bg-yellow-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faClock} />}
                title="Riwayat Pending Panel"
                number={dashboardData.riwayat_pending_panel}
                bgColor="bg-yellow-400"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faSyncAlt} />}
                title="Riwayat Proses PJU"
                number={dashboardData.riwayat_proses_pju}
                bgColor="bg-blue-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faSyncAlt} />}
                title="Riwayat Proses Panel"
                number={dashboardData.riwayat_proses_panel}
                bgColor="bg-blue-400"
              />

              {/* Rata-Rata Riwayat */}
              <ReportCard
                icon={<FontAwesomeIcon icon={faChartLine} />}
                title="Rata-Rata Riwayat per PJU"
                number={dashboardData.avg_riwayat_pju}
                bgColor="bg-purple-500"
              />
              <ReportCard
                icon={<FontAwesomeIcon icon={faChartLine} />}
                title="Rata-Rata Riwayat per Panel"
                number={dashboardData.avg_riwayat_panel}
                bgColor="bg-indigo-400"
              />
            </div>
            
            {/* Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Import Riwayat</h2>
                <ImportRiwayatCard />
              </div>
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Import Riwayat</h2>
                <ExportRiwayatCard />
              </div>
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

const ReportCard = ({ icon, title, number, bgColor }) => {
  // Format number only for avg_riwayat_pju and avg_riwayat_panel
  const formattedNumber =
    title === "Rata-Rata Riwayat per PJU" || title === "Rata-Rata Riwayat per Panel"
      ? number.toFixed(2)
      : number;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center text-center">
      <div
        className={`${bgColor} text-white rounded-lg p-3 md:p-4 text-2xl md:text-3xl mb-2`}
      >
        {icon}
      </div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-lg md:text-2xl font-bold">
        {/* Apply CountUp to animate the number */}
        <CountUp
          start={0}
          end={parseFloat(formattedNumber)}
          duration={2.5}
          separator=","
          decimals={title.includes("Rata-Rata") ? 2 : 0} // Set decimals conditionally
        />
      </p>
    </div>
  );
};
