/* eslint-disable */
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/LandingPage';

import DetailTentangKamiPage from 'pages/TentangKami/DetailTentangKamiPage';
import SekilasTentangKamiPage from 'pages/TentangKami/SekilasTentangKamiPage';
import AreaOperasiKamiPage from 'pages/TentangKami/AreaOperasiKamiPage';
import LayananKamiPage from 'pages/TentangKami/LayananKamiPage';
import SejarahKamiPage from 'pages/TentangKami/SejarahKamiPage';
import TeamKamiPage from 'pages/TentangKami/TeamKamiPage';

import DetailMediaPage from 'pages/Media/DetailMediaPage';
import BeritaPage from 'pages/Media/BeritaPage';
import DetailBeritaPage from 'pages/Media/DetailBeritaPage';

import ContactPage from 'pages/ContactPage';
import NotFoundPage from 'pages/NotFoundPage';
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

import Coba from 'pages/Coba';

import PrivateRoute from 'PrivateRoute';
import './assets/css/styles.css';

function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route exact path="/" element={<LandingPage />} />

      <Route path="/tentangkami" element={<DetailTentangKamiPage />} />
      <Route path="/tentangkami/sekilas" element={<SekilasTentangKamiPage />} />
      <Route path="/tentangkami/area-persebaran" element={<AreaOperasiKamiPage />} />
      <Route path="/tentangkami/layanan" element={<LayananKamiPage />} />
      <Route path="/tentangkami/sejarah" element={<SejarahKamiPage />} />
      <Route path="/tentangkami/team" element={<TeamKamiPage />} />

      <Route path="/media" element={<DetailMediaPage />} />
      <Route path="/media/berita" element={<BeritaPage />} />
      <Route path="/media/berita/:slug" element={<DetailBeritaPage />} />

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/coba" element={<Coba />} />

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