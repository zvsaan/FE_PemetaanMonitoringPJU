import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  position: relative;
`;

const Lamp = styled(motion.div)`
  width: 20px;
  height: 80px;
  background-color: #333;
  position: relative;
  margin-bottom: 50px;

  &::before {
    content: '';
    width: 8px;
    height: 60px;
    background-color: #333;
    position: absolute;
    top: -60px;
    left: 6px;
  }
`;

const Light = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ffcc00;
  border-radius: 50%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 0px 15px 5px rgba(255, 204, 0, 0.5);
`;

const NotFoundText = styled(motion.h1)`
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BackHomeButton = styled(motion(Link))`
    padding: 10px 20px;
  border: 1px solid #ffcc00;
  border-radius: 50px;
  background-color: transparent;
  color: #ffcc00;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Lamp
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Light />
      </Lamp>
      <NotFoundText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        404 - Page Not Found
      </NotFoundText>
      <BackHomeButton
        to="/home"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        Back to Home
      </BackHomeButton>
    </NotFoundContainer>
  );
}

export default NotFound;