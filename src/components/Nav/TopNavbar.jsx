import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Updated import for routing
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/img/logo.png";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="/">
            <img src={LogoIcon} alt="Logo" width={30} height={30} />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              TTMT
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link style={{ padding: "10px 15px" }} to="/">
                Home
              </Link>
            </li>
            <li
              className="semiBold font15 pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              Informasi PJU
              {dropdownOpen && (
                <DropdownMenu>
                  <DropdownItem>
                    <Link to="/viewmaps">Visualisasi Maps</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/tabeldatapju">Tabel Data</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/pengaduan">Pengaduan Masyarakat</Link>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </li>
            {/* <li className="semiBold font15 pointer">
              <Link style={{ padding: "10px 15px" }} to="/tentangkami">
                Tentang Kami
              </Link>
            </li> */}
            <li className="semiBold font15 pointer">
              <Link style={{ padding: "10px 15px" }} to="/hubungikami">
                Hubungi Kami
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer flexCenter">
              <a href="/admin/login" style={{ padding: "10px 15px" }}>
                Login Admin
              </a>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

// Styled components remain the same as before
const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: white;
  transition: height 0.3s ease;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  @media (max-width: 760px) {
    display: none;
  }
  li {
    margin-left: 20px;
    position: relative;
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  border-radius: 8px;
  top: 25px;
  left: 0;
  z-index: 1000;
  min-width: 200px;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  &:hover {
    background-color: #f0f0f0;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: white;
    background-color: #f3a21b;
    border-radius: 50px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #003380;
    }
  }
`;
