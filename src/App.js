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
import PemetaanPJUPage from 'pages/Admin/InformasiPJU/PemetaanPJUPage';

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
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/data-pju" element={<DataPJUPage />} />
        <Route path="/admin/data-panel" element={<DataPanelPage />} />
        <Route path="/admin/pemetaan-pju" element={<PemetaanPJUPage />} />
        <Route path="/admin/data-team" element={<DataTeamPage />} />
        <Route path="/admin/data-berita" element={<DataBeritaPage />} />
        <Route path="/admin/edit-profile" element={<AdminProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;