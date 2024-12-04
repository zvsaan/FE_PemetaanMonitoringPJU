/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import Berita from 'parts/Media/Berita';
import HeroBerita from 'parts/Hero/media/HeroBerita';

export default class BeritaPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroBerita />
        <Berita />
        <Footer />
      </>
    );
  }
}
