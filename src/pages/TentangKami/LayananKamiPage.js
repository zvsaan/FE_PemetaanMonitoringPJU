/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import HeroLayananKami from 'parts/Hero/tentangkami/HeroLayananKami';
import LayananKami from 'parts/TentangKami/LayananKami';

export default class LayananKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroLayananKami />
        <LayananKami />
        <Footer />
      </>
    );
  }
}
