/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import HeroSejarahKami from 'parts/Hero/tentangkami/HeroSejarahKami';
import SejarahKami from 'parts/TentangKami/SejarahKami';

export default class SejarahKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroSejarahKami />
        <SejarahKami />
        <Footer />
      </>
    );
  }
}
