/* eslint-disable */
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/LandingPage';
import BeritaPage from 'pages/BeritaPage';
import DetailTentangKamiPage from 'pages/DetailTentangKamiPage';
import NotFoundPage from 'pages/NotFoundPage';
import TeamPage from 'pages/TeamPage';
import DataPJUUserPage from 'pages/DataPJUPage';
import PemetaanPJUUSerPage from 'pages/PemetaanPJUPage';

import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/Admin/DashboardPage';

import DataPJUPage from 'pages/Admin/InformasiPJU/DataPJUPage';
import DataPanelPage from 'pages/Admin/InformasiPJU/DataPanelPage';

import PemetaanPJUPage from 'pages/Admin/Pemetaan/PemetaanPJUPage';
import PemetaanPanelPage from 'pages/Admin/Pemetaan/PemetaanPanelPage';

import DataKontruksiPage from 'pages/Admin/InformasiPJU/DataPanelKontruksi';

import DataRiwayatPJUPage from 'pages/Admin/InformasiPJU/DataRiwayatPJUPage';
import DataRiwayatPanelPage from 'pages/Admin/InformasiPJU/DataRiwayatPanelPage';

import DataTeamPage from 'pages/Admin/InformasiWeb/DataTeamPage';
import DataBeritaPage from 'pages/Admin/InformasiWeb/DataBeritaPage';
import AdminProfilePage from 'pages/Admin/AdminProfilePage';

import { ProjectDetailPage } from 'pages/BeritaDetailPage';
import { DiscussProjectPage } from 'pages/DiscussProjectPage';

import PrivateRoute from 'PrivateRoute';
import './assets/css/styles.css';

function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/berita" element={<BeritaPage />} />
      <Route path="/tentangkami" element={<DetailTentangKamiPage />} />
      <Route exact path="/berita/:id" element={<ProjectDetailPage />} />
      <Route exact path="/team" element={<TeamPage />} />
      <Route exact path="/data/pemetaan-pju" element={<PemetaanPJUUSerPage />} />
      <Route exact path="/data/data-pju" element={<DataPJUUserPage />} />
      <Route exact path="/discuss-project" element={<DiscussProjectPage />} />
      <Route exact path="/login" element={<LoginPage />} />

      {/* Rute yang Diproteksi */}
      <Route element={<PrivateRoute />}>
        <Route path="/app/admin/dashboard" element={<DashboardPage />} />
        
        <Route path="/app/admin/data-pju" element={<DataPJUPage />} />
        <Route path="/app/admin/data-panel" element={<DataPanelPage />} />

        <Route path="/app/admin/pemetaan-pju" element={<PemetaanPJUPage />} />
        <Route path="/app/admin/pemetaan-panel" element={<PemetaanPanelPage />} />

        <Route path="/app/admin/data-kontruksi" element={<DataKontruksiPage />} />

        <Route path="/app/admin/data-riwayat-pju/:id" element={<DataRiwayatPJUPage />} />
        <Route path="/app/admin/data-riwayat-panel/:id" element={<DataRiwayatPanelPage />} />

        <Route path="/app/admin/data-team" element={<DataTeamPage />} />
        <Route path="/app/admin/data-berita" element={<DataBeritaPage />} />

        <Route path="/app/admin/edit-profile" element={<AdminProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;