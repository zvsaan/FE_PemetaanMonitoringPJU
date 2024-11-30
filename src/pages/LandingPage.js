/* eslint-disable */
import React, { Component } from 'react';
import Header from 'parts/Header';
import Hero from 'parts/Home/Hero';
import TentangKami from 'parts/Home/TentangKami';
import BeritaTerkini from 'parts/Home/BeritaTerkini';
import Discuss from 'parts/Home/PengaduanCard';
import Footer from 'parts/Footer';

export default class LandingPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <Hero />
        <TentangKami />
        <BeritaTerkini />
        <Discuss />
        <Footer />
      </>
    );
  }
}
