import React, { useState } from "react";
import styled from "styled-components";

// Dummy images, replace with actual assets
import DashboardImage from "../../assets/img/image2.webp";
import CasesImage from "../../assets/img/image2.webp";

// Component utama
export default function BasecampStyleSection() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <FullScreenContainer>
      <GridWrapper>
        {/* Case for Programmer Section */}
        <ImageWrapper className="image-container">
          <StyledImage className="tilted" src={CasesImage} alt="Cases for a Programmer" />
        </ImageWrapper>

        {/* Video Section */}
        <VideoWrapper className="image-container">
          <VideoText className="tilted">
            Watch this quick video to see how Basecamp works
            <VideoButton onClick={handleOpenModal}>Learn More</VideoButton>
          </VideoText>
        </VideoWrapper>

        {/* Mission Control Section */}
        <ImageWrapperRight className="image-container">
          <StyledImage className="tilted" src={DashboardImage} alt="Mission Control" />
        </ImageWrapperRight>
      </GridWrapper>

      {/* Modal untuk video */}
      {isModalOpen && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <VideoPlayer
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="How Basecamp Works"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </FullScreenContainer>
  );
}

// Styled components

const FullScreenContainer = styled.div`
  width: 100vw; /* Full width of the viewport */
  padding: 50px 0;
  background-color: #ffff;
  display: flex;
  justify-content: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px; /* Adjust the gap for more spacing */
  width: 100%; /* No side margins */
  max-width: 100%;
  position: relative;
`;

const VideoButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: 1px solid black;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fcdc00; /* Change color on hover */
    border: 1px solid white;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  perspective: 1000px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, z-index 0.1s ease-in-out;

  &:hover {
    z-index: 10;
  }

  &:hover .tilted {
    transform: rotate(0deg) scale(1.1);
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.3);
  }
`;

const StyledImage = styled.img`
  width: 120%;
  object-fit: contain;
  transform: rotate(-5deg);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: 7px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcdc00;
  color: #000;
  text-align: center;
  padding: 40px;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  border-radius: 7px;
  margin-bottom: 20px;
  z-index: 1;
  perspective: 1000px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, z-index 0.1s ease-in-out;

  transform: rotate(5deg);

  &:hover {
    z-index: 10;
    transform: rotate(0deg) scale(1.15);
    box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.3);
  }
`;

const VideoText = styled.p`
  max-width: 800px;
  transition: transform 0.3s ease-in-out;
  padding: 20px;
`;

const ImageWrapperRight = styled(ImageWrapper)`
  z-index: 3;

  &:hover {
    z-index: 10;
  }
`;

// Modal Styles

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const VideoPlayer = styled.iframe`
  width: 100%;
  height: 450px;
  border: none;
  border-radius: 8px;
`;