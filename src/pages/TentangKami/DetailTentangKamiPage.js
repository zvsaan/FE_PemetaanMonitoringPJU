/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import DetailTentangKami from 'parts/TentangKami/DetailTentangKami';
import HeroTentangKami from 'parts/Hero/tentangkami/HeroTentangKami';

export default class DetailTentangKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroTentangKami />
        <DetailTentangKami />
        <Footer />
      </>
    );
  }
}
