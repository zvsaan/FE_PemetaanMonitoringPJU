/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import DetailBerita from 'parts/Media/DetailBerita';
import HeroDetailBerita from 'parts/Hero/media/HeroDetailBerita';

export default class DetailBeritaPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroDetailBerita />
        <DetailBerita />
        <Footer />
      </>
    );
  }
}
