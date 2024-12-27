/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBolt, faThLarge,faHistory,faClock,faBars,faSyncAlt,faChartLine,} from "@fortawesome/free-solid-svg-icons";
import 'react-calendar/dist/Calendar.css';
import SidebarVisitor from 'parts/SidebarVisitor';
import HeaderVisitor from 'parts/HeaderVisitor';
import AdminImage from '../../assets/images/admin.png';
import axios from 'axios';
import AnalysisCard from 'parts/Visitor/Analystic/AnalysisCard';
import ProblemPercentageCard from 'parts/Visitor/Analystic/ProblemPercentageCard';
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
        .get('http://localhost:8000/api/visitor/dashboard-data', {
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
        <SidebarVisitor isOpen={isOpen} toggleSidebar={this.toggleSidebar} />

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
          <HeaderVisitor />

          {/* Main Dashboard Content */}
          <main className="p-4 sm:p-6 w-full">
            <h1 className="text-3xl font-bold text-green-600">Visitor Dashboard</h1>
            <p>Selamat datang visitor!</p>

            {/* Welcome Card */}
            <div className="bg-green-600 text-white rounded-xl p-6 flex items-center relative mt-6 mb-6">
              <img
                src={AdminImage}
                alt="Visitor"
                className="w-16 h-16 md:w-32 md:h-auto absolute left-4 md:left-0 transform -translate-y-1/4"
              />
              <div className="ml-24 md:ml-36">
                <h2 className="text-xl md:text-2xl font-bold">Welcome, Visitor</h2>
                <p>Stay updated with the latest report information</p>
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
            </div>
          </main>
        </div>

        {/* Floating Button */}
        <button
          onClick={this.toggleSidebar}
          className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-700 transition md:hidden"
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
