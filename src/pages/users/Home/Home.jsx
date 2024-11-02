import React from "react";
// Sections
import Header from "../../../components/Sections/Header";
import Services from "../../../components/Sections/Services";
import Projects from "../../../components/Sections/Projects";
import Blog from "../../../components/Sections/Blog";
import Pricing from "../../../components/Sections/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <Services />
      <Projects />
      <Pricing />
      <Blog />
      
    </>
  );
}