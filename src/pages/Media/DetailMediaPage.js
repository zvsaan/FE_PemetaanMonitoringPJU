/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import DetailMedia from 'parts/Media/DetailMedia';
import HeroMedia from 'parts/Hero/media/HeroMedia';

export default class DetailMediaPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroMedia />
        <DetailMedia />
        <Footer />
      </>
    );
  }
}
