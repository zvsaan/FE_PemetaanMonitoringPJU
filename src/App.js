/* eslint-disable */
import { Route, Routes, useLocation } from "react-router-dom";
import WhatsAppButton from "elements/WhatsAppButton";

import LandingPage from "pages/LandingPage";
import DetailTentangKamiPage from "pages/TentangKami/DetailTentangKamiPage";
import SekilasTentangKamiPage from "pages/TentangKami/SekilasTentangKamiPage";
import AreaOperasiKamiPage from "pages/TentangKami/AreaOperasiKamiPage";
import LayananKamiPage from "pages/TentangKami/LayananKamiPage";
import SejarahKamiPage from "pages/TentangKami/SejarahKamiPage";
import TeamKamiPage from "pages/TentangKami/TeamKamiPage";

import DetailMediaPage from "pages/Media/DetailMediaPage";
import BeritaPage from "pages/Media/BeritaPage";
import DetailBeritaPage from "pages/Media/DetailBeritaPage";

import ContactPage from "pages/ContactPage";
import NotFoundPage from "pages/NotFoundPage";
import LoginPage from "pages/LoginPage";

import DashboardPage from "pages/Admin/DashboardPage";

import DataPJUPage from "pages/Admin/InformasiPJU/DataPJUPage";
import DataPanelPage from "pages/Admin/InformasiPJU/DataPanelPage";
import DataKonstruksiPage from "pages/Admin/InformasiPJU/DataKonstruksiPage";

import PemetaanPJUPage from "pages/Admin/Pemetaan/PemetaanPJUPage";
import PemetaanPanelPage from "pages/Admin/Pemetaan/PemetaanPanelPage";

import DataRiwayatPJUPage from "pages/Admin/InformasiPJU/DataRiwayatPJUPage";
import DataRiwayatPanelPage from "pages/Admin/InformasiPJU/DataRiwayatPanelPage";

import DashboardPageVisitor from "pages/Visitor/DashboardPage";

import DataPJUPageVisitor from "pages/Visitor/InformasiPJU/DataPJUPage";
import DataPanelPageVisitor from "pages/Visitor/InformasiPJU/DataPanelPage";
import DataKonstruksiPageVisitor from "pages/Visitor/InformasiPJU/DataKonstruksiPage";

import PemetaanPJUPageVisitor from "pages/Visitor/Pemetaan/PemetaanPJUPage";
import PemetaanPanelPageVisitor from "pages/Visitor/Pemetaan/PemetaanPanelPage";

import DataRiwayatPJUPageVisitor from "pages/Visitor/InformasiPJU/DataRiwayatPJUPage";
import DataRiwayatPanelPageVisitor from "pages/Visitor/InformasiPJU/DataRiwayatPanelPage";

import DashboardPageSuperAdmin from "pages/SuperAdmin/DashboardPage";
import UserManagementPage from "pages/SuperAdmin/UserManagementPage";

import DataTeamPage from "pages/Admin/InformasiWeb/DataTeamPage";
import DataBeritaPage from "pages/Admin/InformasiWeb/DataBeritaPage";

import DataPengaduanPage from "pages/Admin/Pengaduan/DataPengaduanPage";

import Coba from "pages/Coba";

import PrivateRoute from "PrivateRoute";
import "./assets/css/styles.css";

function App() {
  const location = useLocation();

  // Daftar halaman di mana tombol WhatsApp harus ditampilkan
  const allowedPaths = [
    "/",
    "/tentangkami",
    "/tentangkami/sekilas",
    "/tentangkami/area-operasi",
    "/tentangkami/layanan",
    "/tentangkami/sejarah",
    "/tentangkami/team",
    "/media",
    "/media/berita",
    "/media/berita/:slug",
    "/contact",
    "/coba",
  ];

  return (
    <div>
      <Routes>
        {/* Rute Publik */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/tentangkami" element={<DetailTentangKamiPage />} />
        <Route path="/tentangkami/sekilas" element={<SekilasTentangKamiPage />} />
        <Route path="/tentangkami/area-operasi" element={<AreaOperasiKamiPage />} />
        <Route path="/tentangkami/layanan" element={<LayananKamiPage />} />
        <Route path="/tentangkami/sejarah" element={<SejarahKamiPage />} />
        <Route path="/tentangkami/team" element={<TeamKamiPage />} />
        <Route path="/media" element={<DetailMediaPage />} />
        <Route path="/media/berita" element={<BeritaPage />} />
        <Route path="/media/berita/:slug" element={<DetailBeritaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coba" element={<Coba />} />

        <Route exact path="/login" element={<LoginPage />} />

        {/* Rute Visitor */}
        <Route element={<PrivateRoute allowedRoles={["visitor"]} />}>
          <Route path="/v1/visitor/home" element={<DashboardPageVisitor />} />
          <Route path="/v1/visitor/apjdata" element={<DataPJUPageVisitor />} />
          <Route path="/v1/visitor/paneldata" element={<DataPanelPageVisitor />} />
          <Route path="/v1/visitor/konstruksidata" element={<DataKonstruksiPageVisitor />} />
          <Route path="/v1/visitor/apjpemetaan" element={<PemetaanPJUPageVisitor />} />
          <Route path="/v1/visitor/panelpemetaan" element={<PemetaanPanelPageVisitor />} />
          <Route path="/v1/visitor/riwayatapj/:id" element={<DataRiwayatPJUPageVisitor />} />
          <Route path="/v1/visitor/riwayatpanel/:id" element={<DataRiwayatPanelPageVisitor />} />
        </Route>

        {/* Rute Admin */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/app/admin/dashboard" element={<DashboardPage />} />
          <Route path="/app/admin/data-pju" element={<DataPJUPage />} />
          <Route path="/app/admin/data-panel" element={<DataPanelPage />} />
          <Route path="/app/admin/data-konstruksi" element={<DataKonstruksiPage />} />
          <Route path="/app/admin/pemetaan-pju" element={<PemetaanPJUPage />} />
          <Route path="/app/admin/pemetaan-panel" element={<PemetaanPanelPage />} />
          <Route path="/app/admin/data-riwayat-pju/:id" element={<DataRiwayatPJUPage />} />
          <Route path="/app/admin/data-riwayat-panel/:id" element={<DataRiwayatPanelPage />} />
          <Route path="/app/admin/data-team" element={<DataTeamPage />} />
          <Route path="/app/admin/data-berita" element={<DataBeritaPage />} />
          <Route path="/app/admin/pengaduan" element={<DataPengaduanPage />} />
        </Route>

        {/* Rute Super Admin */}
        <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
          <Route path="/app/superadmin/dashboard" element={<DashboardPageSuperAdmin />} />
          <Route path="/app/superadmin/data-users" element={<UserManagementPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Tampilkan Tombol WhatsApp Hanya di Halaman yang Diizinkan */}
      {allowedPaths.includes(location.pathname) && <WhatsAppButton />}
    </div>
  );
}

export default App;