import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Mengimpor CSS Carousel dengan benar

const About = () => {
  return (
    <Wrapper>
      <Container>
        <Title>About PT Tri Tunggal Madiun Terang</Title>
        <Description>
          PT Tri Tunggal Madiun Terang adalah perusahaan yang bergerak dalam
          pengelolaan dan monitoring Penerangan Jalan Umum (PJU) di Kabupaten
          Madiun. Kami menggunakan teknologi modern seperti GIS dan Google Earth
          untuk memastikan jalan utama di Kabupaten Madiun terang, aman, dan
          terawat dengan baik.
        </Description>

        <CarouselContainer>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            dynamicHeight
          >
            <div>
              <img src="https://images.app.goo.gl/6ShMNMiRZ8h6aGRy9" alt="PJU Monitoring" />
              <p className="legend">Monitoring PJU</p>
            </div>
            <div>
              <img src="https://images.app.goo.gl/6ShMNMiRZ8h6aGRy9" alt="Pemetaan PJU" />
              <p className="legend">Pemetaan dan Perbaikan</p>
            </div>
            <div>
              <img src="https://images.app.goo.gl/6ShMNMiRZ8h6aGRy9" alt="Pengajuan PJU" />
              <p className="legend">Pengajuan PJU Baru</p>
            </div>
          </Carousel>
        </CarouselContainer>

        <InfoWrapper>
          <InfoBox>
            <h3>Monitoring PJU</h3>
            <p>
              Kami memantau lebih dari 1000 titik PJU di seluruh Kabupaten
              Madiun dengan laporan yang terintegrasi langsung dengan Dishub
              Madiun.
            </p>
          </InfoBox>
          <InfoBox>
            <h3>Pemetaan dan Perbaikan</h3>
            <p>
              Setiap kerusakan PJU segera diperbaiki setelah diverifikasi, dan
              tim teknis kami siap siaga 24/7 untuk perbaikan.
            </p>
          </InfoBox>
          <InfoBox>
            <h3>Pengajuan PJU Baru</h3>
            <p>
              Masyarakat dapat mengajukan pemasangan PJU baru melalui sistem
              online kami yang terintegrasi secara langsung.
            </p>
          </InfoBox>
        </InfoWrapper>
      </Container>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  background: linear-gradient(135deg, #f0f4fd, #d9e6fd);
  min-height: 100vh;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: #012970;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #6b7c93;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CarouselContainer = styled.div`
  margin-bottom: 50px;

  .carousel .slide {
    background: none;
  }

  .carousel .legend {
    background: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 1.2em;
    padding: 10px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const InfoBox = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  padding: 30px;
  margin: 20px auto;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  }

  h3 {
    font-size: 1.5em;
    color: #012970;
    margin-bottom: 15px;
  }

  p {
    font-size: 1em;
    color: #6b7c93;
  }
`;