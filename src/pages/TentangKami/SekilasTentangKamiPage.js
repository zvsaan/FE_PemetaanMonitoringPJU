/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import SekilasTentangKami from 'parts/TentangKami/SekilasTentangKami';
import HeroSekilasTentangKami from 'parts/Hero/tentangkami/HeroSekilasTentangKami';

export default class SekilasTentangKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroSekilasTentangKami />
        <SekilasTentangKami />
        <Footer />
      </>
    );
  }
}
