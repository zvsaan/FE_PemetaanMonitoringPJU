import React from "react";
import styled from "styled-components";

// Container utama
const MapsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    padding-top: 40px;
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

// Styled component for iframe
const MapIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    height: 300px;
  }
`;

export default function Maps() {
  return (
    <MapsViewContainer>
      <Header>
        <HeaderLeft>
          <div>MapsView</div>
          <HeaderLeftP><p>Senin, 21 Oktober 2004</p></HeaderLeftP>
        </HeaderLeft>
      </Header>

      {/* Iframe Google Maps */}
      <MapIframe
        src="https://www.google.com/maps/d/embed?mid=1vOMB1Cp9OWh59fxFhvwqF4q8Wrzei1M&ehbc=2E312F"
        allowFullScreen
        title="Google Maps"
      />
    </MapsViewContainer>
  );
}