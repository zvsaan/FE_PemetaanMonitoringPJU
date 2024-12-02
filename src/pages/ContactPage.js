/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import Contact from 'parts/Contact/Contact';
import HeroContact from 'parts/Hero/HeroContact';

export default class ContactPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroContact />
        <Contact />
        <Footer />
      </>
    );
  }
}
