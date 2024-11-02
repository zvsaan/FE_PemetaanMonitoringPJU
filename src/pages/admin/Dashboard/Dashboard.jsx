import React, { useState } from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaUserCircle, FaLightbulb, FaCheckCircle, FaTimesCircle, FaTools, FaSearch } from "react-icons/fa";
import AdminImage from '../../../assets/img/admin.png';

// Container utama
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    padding-top: 40px;
  }
`;

// Bagian Kiri - Header, WelcomeCard, dan Report
const MainContent = styled.div`
  flex: 2;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Bagian Kanan untuk Card dan Kalender
const RightSidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;

  @media (max-width: 768px) {
    padding-left: 0;
    width: 100%;
  }
`;

// Header bagian atas
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderLeft = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const HeaderLeftP = styled.p`
  font-size: 10px;
  color: gray;
  letter-spacing: 1px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 30px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 5px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  padding: 10px;
  background-color: transparent;
  width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfileButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 40px;
  color: #7165d6;
  display: flex;
  align-items: center;
`;

// Kartu Selamat Datang
const WelcomeCard = styled.div`
  background-color: #7165d6;
  color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex; /* Menjadikan elemen di dalamnya sejajar secara horizontal */
  align-items: center; /* Vertically align items */
  margin-bottom: 20px;
  position: relative; /* Menjadikan kontainer relatif untuk positioning absolut pada gambar */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

const WelcomeTextContainer = styled.div`
  margin-left: 140px; /* Mengatur jarak teks dari gambar */
`;

const WelcomeText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const WelcomeSubtext = styled.div`
  font-size: 16px;
  margin-top: 10px;
`;

// Gaya untuk gambar di WelcomeCard
const AdminImageStyle = styled.img`
  width: 200px;
  height: auto;
  position: absolute;
  bottom: -40px;
  left: 0;
  transform: translateY(-20%);
`;

// Container untuk bagian report
const ReportContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ReportCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  background-color: ${(props) => props.bgColor};
  color: white;
  font-size: 40px;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReportTitle = styled.div`
  font-size: 14px;
`;

const ReportNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

// Bagian Kartu di samping kanan
const CardContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 14px;
  color: #555;
`;

// Kalender di bawah Card
const CalendarContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const CalendarTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <DashboardContainer>
      {/* Bagian Kiri */}
      <MainContent>
        <Header>
          <HeaderLeft>
            <div>Dashboard</div>
            <HeaderLeftP><p>Senin, 21 Oktober 2004</p></HeaderLeftP>
          </HeaderLeft>
        </Header>

        <WelcomeCard>
          <AdminImageStyle src={AdminImage} alt="Doctor" />
          <WelcomeTextContainer>
            <WelcomeText>Welcome, Admin TTMT</WelcomeText>
            <WelcomeSubtext>Have a nice day at work</WelcomeSubtext>
          </WelcomeTextContainer>
        </WelcomeCard>

        <ReportContainer>
          <ReportCard>
            <IconWrapper bgColor="#6c63ff">
              <FaLightbulb />
            </IconWrapper>
            <ReportTitle>Total PJU</ReportTitle>
            <ReportNumber>250</ReportNumber>
          </ReportCard>
          <ReportCard>
            <IconWrapper bgColor="#3bc9db">
              <FaCheckCircle />
            </IconWrapper>
            <ReportTitle>Lampu Berfungsi</ReportTitle>
            <ReportNumber>220</ReportNumber>
          </ReportCard>
          <ReportCard>
            <IconWrapper bgColor="#ff6b6b">
              <FaTimesCircle />
            </IconWrapper>
            <ReportTitle>Lampu Rusak</ReportTitle>
            <ReportNumber>30</ReportNumber>
          </ReportCard>
          <ReportCard>
            <IconWrapper bgColor="#ffa94d">
              <FaTools />
            </IconWrapper>
            <ReportTitle>Perbaikan</ReportTitle>
            <ReportNumber>15</ReportNumber>
          </ReportCard>
        </ReportContainer>
      </MainContent>

      {/* Bagian Kanan */}
      <RightSidebar>
        <HeaderRight>
          <SearchContainer>
            <FaSearch color="#7165d6" />
            <SearchInput placeholder="Search..." />
          </SearchContainer>
          <ProfileButton>
            <FaUserCircle />
          </ProfileButton>
        </HeaderRight>

        <CardContainer>
          <CardTitle>Company Profile</CardTitle>
          <CardContent>
            Kunjungi Website Company Profile dari PT. Tri Tunggal Madiun Terang
          </CardContent>
        </CardContainer>

        {/* Kalender di bawah card */}
        <CalendarContainer>
          <CalendarTitle>August, 2023</CalendarTitle>
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date, view }) => {
              if (date.getDate() === new Date().getDate()) {
                return 'highlight';
              }
            }}
          />
        </CalendarContainer>
      </RightSidebar>
    </DashboardContainer>
  );
}