/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import AreaOperasiKami from 'parts/TentangKami/AreaOperasiKami';
import HeroAreaOperasiKami from 'parts/Hero/tentangkami/HeroAreaOperasiKami';

export default class AreaOperasiKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroAreaOperasiKami />
        <AreaOperasiKami />
        <Footer />
      </>
    );
  }
}
