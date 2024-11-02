import React from "react";
import styled from "styled-components";
// Components
import PricingTable from "../Elements/PricingTable";

export default function Pricing() {
  return (
    <Wrapper id="monitoring">
      <div className="grayBg">
        <div className="container">
          {/* <HeaderInfo>
            <h1 className="font40 extraBold">Sistem Monitoring PJU Kabupaten Madiun</h1>
            <p className="font13">
              PT Tri Tunggal Madiun Terang bertanggung jawab untuk pemantauan dan perawatan Penerangan Jalan Umum (PJU)
              <br />
              di seluruh Kabupaten Madiun, dengan dukungan teknologi terkini.
            </p>
          </HeaderInfo> */}
          <TablesWrapper className="flexSpaceNull">
            <TableBox>
              <PricingTable
                icon="map"
                price="Pemetaan"
                title="Pemetaan PJU"
                text="Pengelolaan titik PJU di seluruh Kabupaten Madiun menggunakan teknologi GIS dan Google Earth."
                offers={[
                  { name: "Lokasi PJU Terdata", cheked: true },
                  { name: "Riwayat Kerusakan", cheked: true },
                  { name: "Pemetaan Jalan Utama", cheked: true },
                  { name: "Verifikasi Lapangan", cheked: false },
                  { name: "Integrasi dengan Dishub", cheked: true },
                ]}
                action={() => alert("Pemetaan PJU")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="tools"
                price="Perawatan"
                title="Perawatan PJU"
                text="Perbaikan rutin dan perawatan PJU untuk memastikan penerangan yang optimal."
                offers={[
                  { name: "Laporan Kerusakan", cheked: true },
                  { name: "Tim Siaga 24/7", cheked: true },
                  { name: "Pemantauan CCTV", cheked: false },
                  { name: "Perawatan Berkala", cheked: true },
                  { name: "Penggantian Lampu", cheked: true },
                ]}
                action={() => alert("Perawatan PJU")}
              />
            </TableBox>
            <TableBox>
              <PricingTable
                icon="cloud"
                price="Pengajuan"
                title="Pengajuan PJU Baru"
                text="Sistem pengajuan PJU baru oleh masyarakat melalui platform online terintegrasi."
                offers={[
                  { name: "Form Pengajuan Online", cheked: true },
                  { name: "Verifikasi Lapangan", cheked: true },
                  { name: "Respons Cepat", cheked: true },
                  { name: "Pelaporan Langsung", cheked: false },
                  { name: "Integrasi WA Bot", cheked: true },
                ]}
                action={() => alert("Pengajuan PJU")}
              />
            </TableBox>
          </TablesWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 50px 0;
  background: #f5f7fa;
`;
const HeaderInfo = styled.div`
padding-top: 50px;
  margin-bottom: 50px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const TablesWrapper = styled.div`
padding-bottom: 50px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;
const TableBox = styled.div`
  width: 31%;
  @media (max-width: 860px) {
    width: 100%;
    max-width: 370px;
    margin: 20px 0;
  }
`;
