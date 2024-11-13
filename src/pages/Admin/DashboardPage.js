/* eslint-disable */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faCheckCircle, faTimesCircle, faTools } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SidebarAdmin from 'parts/SidebarAdmin';
import HeaderAdmin from 'parts/HeaderAdmin';
import AdminImage from '../../assets/images/admin.png';
import AnalysisCard from 'parts/Admin/Analystic/AnalysisCard';
import ProblemPercentageCard from 'parts/Admin/Analystic/ProblemPercentageCard';

export default class DashboardPage extends Component {
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
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <SidebarAdmin isOpen={this.state.isOpen} toggleSidebar={this.toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Header */}
          <HeaderAdmin toggleSidebar={this.toggleSidebar} />

          {/* Main Dashboard Content */}
          <main className="p-6">
            <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
            <p>Selamat datang di panel admin!</p>

            {/* Welcome Card */}
            <div className="bg-purple-600 text-white rounded-xl p-6 flex items-center relative mt-6 mb-6">
              <img src={AdminImage} alt="Admin" className="w-16 h-16 md:w-32 md:h-auto absolute left-4 md:left-0 transform -translate-y-1/4" />
              <div className="ml-24 md:ml-36">
                <h2 className="text-xl md:text-2xl font-bold">Welcome, Admin TTMT</h2>
                <p>Have a nice day at work</p>
              </div>
            </div>

           {/* Report Section */}
            <div className="grid grid-cols-2 md:grid-cols-auto-fit gap-6">
            <ReportCard icon={<FontAwesomeIcon icon={faLightbulb} />} title="Total PJU" number="250" bgColor="bg-indigo-500" />
            <ReportCard icon={<FontAwesomeIcon icon={faCheckCircle} />} title="Lampu Berfungsi" number="220" bgColor="bg-teal-400" />
            <ReportCard icon={<FontAwesomeIcon icon={faTimesCircle} />} title="Lampu Rusak" number="30" bgColor="bg-red-400" />
            <ReportCard icon={<FontAwesomeIcon icon={faTools} />} title="Perbaikan" number="15" bgColor="bg-orange-400" />
            </div>

            {/* Analysis Section */}
            <AnalysisCard />
          </main>
        </div>

        <div className="flex flex-col gap-6 p-4 w-full lg:w-1/3 mt-6 lg:mt-0">
        {/* Company Profile Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow w-full">
            <h3 className="text-md md:text-lg font-semibold mb-2">PT Tri Tunggal Madiun Terang</h3>
            <p>Lighting the Way Elevating Safety Standards, Menerangi Madiun, memastikan kenyamanan jalan.</p>
        </div>

        {/* New Company */}
            <div className="bg-green-300 text-green-900 rounded-lg p-6 flex flex-col items-center shadow" style={{ minHeight: '140px' }}>
            <p className="font-semibold text-center mb-4">Website Company Profile PT TTMT</p>
            <button className="bg-white text-green-700 py-2 px-4 rounded-full font-semibold">Kunjungi</button>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow w-full">
            <h3 className="text-md md:text-lg font-semibold mb-2">Kalender Sekarang</h3>
            <Calendar />
        </div>

        {/* ProblemPercentageCard */}
        <ProblemPercentageCard />
        </div>
      </div>
    );
  }
}

// Component untuk ReportCard
const ReportCard = ({ icon, title, number, bgColor }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow flex flex-col items-center text-center">
    <div className={`${bgColor} text-white rounded-lg p-3 md:p-4 text-2xl md:text-3xl mb-2`}>
      {icon}
    </div>
    <h4 className="text-sm font-semibold">{title}</h4>
    <p className="text-lg md:text-2xl font-bold">{number}</p>
  </div>
);