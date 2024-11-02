import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Assets
import CloseIcon from "../../assets/svg/CloseIcon";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Wrapper className="animate darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            TTMT
          </h1>
        </div>
        <CloseBtn onClick={() => toggleSidebar(!sidebarOpen)} className="animate pointer">
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/" className="whiteColor" style={{ padding: "10px 15px" }}>
            Home
          </Link>
        </li>
        <li
          className="semiBold font15 pointer whiteColor"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            padding: "10px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          Informasi PJU
          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem>
                <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/viewmaps">Visualisasi Maps</Link>
              </DropdownItem>
              <DropdownItem>
                <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/tabeldatapju">Tabel Data</Link>
              </DropdownItem>
              <DropdownItem>
                <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/pengaduan">Pengaduan Masyarakat</Link>
              </DropdownItem>
            </DropdownMenu>
          )}
        </li>
        {/* <li className="semiBold font15 pointer">
          <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/tentangkami" className="whiteColor" style={{ padding: "10px 15px" }}>
            Tentang Kami
          </Link>
        </li> */}
        <li className="semiBold font15 pointer">
          <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/hubungikami" className="whiteColor" style={{ padding: "10px 15px" }}>
            Hubungi Kami
          </Link>
        </li>
      </UlStyle>

      <LoginUlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <Link onClick={() => toggleSidebar(!sidebarOpen)} to="/admin/login" className="whiteColor" style={{ padding: "10px 15px" }}>
            Login Admin
          </Link>
        </li>
      </LoginUlStyle>
    </Wrapper>
  );
}

// Styled components remain the same as before
const Wrapper = styled.nav`
  width: 300px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  transition: right 0.3s ease;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
const LoginUlStyle = styled(UlStyle)`
  margin-top: auto;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #f3a21b;
  border-radius: 50px;
  padding: 2px 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #003380;
  }
`;
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px 0;
  background-color: #444;
  border-radius: 8px;
  margin-top: 5px;
  width: 100%;
  z-index: 1;
`;
const DropdownItem = styled.div`
  padding: 10px 20px;
  &:hover {
    background-color: #555;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;