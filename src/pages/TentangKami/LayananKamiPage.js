/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import HeroLayananKami from 'parts/Hero/tentangkami/HeroLayananKami';
// import HeroAreaOperasiKami from 'parts/Hero/tentangkami/HeroAreaOperasiKami';

export default class LayananKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroLayananKami />
        {/* <SekilasTentangKami /> */}
        <Footer />
      </>
    );
  }
}
