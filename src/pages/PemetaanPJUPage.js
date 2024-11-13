/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Header from 'parts/Header';
import PemetaanPJU from 'parts/Data/PemetaanPJU';
import Footer from 'parts/Footer';

export default class PemetaanPJUPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <PemetaanPJU />
        <Footer />
      </>
    );
  }
}