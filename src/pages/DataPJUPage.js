/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import Header from 'parts/Header';
import DataPJU from 'parts/Data/DataPJU';
import Footer from 'parts/Footer';

export default class DataPJUPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <DataPJU />
        <Footer />
      </>
    );
  }
}