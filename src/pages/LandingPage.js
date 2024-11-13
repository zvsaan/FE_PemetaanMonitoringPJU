/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

import {
  Portfolios,
} from 'json/landingPageData';
import Header from 'parts/Header';
import Hero from 'parts/Home/Hero';
import Service from 'parts/Home/TentangKami';
import Portfolio from 'parts/Home/Berita';
import Advantage from 'parts/Home/PerjalananKami';
// import Testimonial from 'parts/Testimonial';
import Discuss from 'parts/Home/Contact';
import Footer from 'parts/Footer';

export default class LandingPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <Hero />
        <Service />
        <Portfolio data={Portfolios} />
        <Advantage />
        <Discuss />
        <Footer />
      </>
    );
  }
}
