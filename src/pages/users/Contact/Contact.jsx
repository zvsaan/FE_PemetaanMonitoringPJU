import React from "react";
import styled from "styled-components";
// Import the local image
import ContactImage from '../../../assets/img/contact.jpg';

export default function Contact() {
  return (
    <Wrapper>
      <HeroSection>
        <Overlay>
          <HeroContent>
            <h1>Hubungi Kami</h1>
            <p>
              Kami siap membantu Anda! Jika Anda memiliki pertanyaan, umpan balik, atau proyek yang ingin didiskusikan, jangan ragu untuk menghubungi kami.
            </p>
          </HeroContent>
        </Overlay>
      </HeroSection>

      <ContentSection>
        <FormWrapper>
          <h2>Kirim Pesan</h2>
          <form>
            <InputWrapper>
              <label htmlFor="name">Masukkan Nama Anda</label>
              <input type="text" id="name" placeholder="Nama Lengkap" />
            </InputWrapper>

            <InputWrapper>
              <label htmlFor="email">Masukkan Email Anda</label>
              <input type="email" id="email" placeholder="email@example.com" />
            </InputWrapper>

            <InputWrapper>
              <label htmlFor="message">Pesan Anda</label>
              <textarea id="message" placeholder="Tulis pesan Anda..." rows="5" />
            </InputWrapper>

            <Button type="submit">Kirim Pesan</Button>
          </form>
        </FormWrapper>

        <ContactInfo>
          <h2>Informasi Kontak</h2>
          <p><strong>Alamat :</strong> Jl. A Yani Rt.012 RW.01 Ngampel, Mejayan, Kab Madiun</p>
          <p><strong>Email :</strong> tri.tunggal.madiun.terang@gmail</p>
          <p><strong>Telepon :</strong> 0678987654678</p>
          <MapWrapper>
            <iframe
              title="Lokasi Kantor"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4984.61218858511!2d111.64414376296848!3d-7.532844788979719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79c7001d66242f%3A0x543fc02ea9245fb3!2sPT.%20TRI%20TINGGAL%20MADIUN%20TERANG!5e1!3m2!1sid!2sid!4v1729275643964!5m2!1sid!2sid"
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d311.5382282278023!2d111.64805287545016!3d-7.532891462127034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79c7001d66242f%3A0x543fc02ea9245fb3!2sPT.%20TRI%20TINGGAL%20MADIUN%20TERANG!5e1!3m2!1sid!2sid!4v1729272049095!5m2!1sid!2sid"
              width="100%"
              height="250px"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </MapWrapper>
        </ContactInfo>
      </ContentSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-family: 'Khula', sans-serif;
`;

const HeroSection = styled.div`
  background-image: url(${ContactImage});
  background-size: cover;
  background-position: center;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  margin-top: 50px;
  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContentSection = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const FormWrapper = styled.div`
  width: 48%;
  background-color: #fff;
  padding: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
  }
  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: #f3a21b;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003380;
  }
`;

const ContactInfo = styled.div`
  width: 48%;
  padding: 30px;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 600;
  }
  p {
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 1.6;
  }
`;

const MapWrapper = styled.div`
  margin-top: 20px;
  iframe {
    width: 100%;
    height: 300px;
    border: 0;
    border-radius: 8px;
  }
`;