import React from "react";
import styled from "styled-components";
// Components
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import TestimonialSlider from "../Elements/TestimonialSlider";

export default function Blog() {
  return (
    <Wrapper id="blog">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Sistem Pemetaan dan Monitoring PJU</h1>
            <p className="font13">
              Sistem ini dirancang untuk memantau dan mendata kondisi Penerangan Jalan Umum (PJU) di Kabupaten Madiun.
              <br />
              Dengan bantuan teknologi GIS dan Google Earth, data terkait PJU dapat dikelola dengan lebih efisien.
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Pengajuan PJU"
                text="Sistem ini memungkinkan masyarakat untuk mengajukan permintaan pemasangan atau perbaikan PJU dengan mudah."
                tag="pengajuan"
                author="Dishub Madiun, 3 hari yang lalu"
                action={() => alert("Pengajuan PJU diklik")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Monitoring PJU"
                text="Sistem monitoring memantau kondisi PJU secara real-time, memberikan laporan berkala terkait kerusakan dan perbaikan."
                tag="monitoring"
                author="PT Tri Tunggal Madiun Terang, 5 hari yang lalu"
                action={() => alert("Monitoring PJU diklik")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Data Riwayat PJU"
                text="Semua riwayat perbaikan, kerusakan, dan pemasangan PJU di Kabupaten Madiun tersimpan dalam sistem ini."
                tag="riwayat"
                author="Admin PJU, 1 minggu yang lalu"
                action={() => alert("Data Riwayat PJU diklik")}
              />
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Lihat Selengkapnya" action={() => alert("Lihat Selengkapnya diklik")} />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg" style={{padding: '50px 0'}}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Apa Kata Mereka?</h1>
            <p className="font13">
              Berikut adalah beberapa testimoni dari masyarakat dan pihak terkait mengenai sistem Pemetaan dan Monitoring PJU.
            </p>
          </HeaderInfo>
          <TestimonialSlider />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;