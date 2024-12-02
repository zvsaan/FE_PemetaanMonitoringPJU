/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import HeroTeamKami from 'parts/Hero/tentangkami/HeroTeamKami';
// import HeroTentangKami from 'parts/Hero/tentangkami/HeroTentangKami';

export default class TeamKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroTeamKami />
        {/* <TeamKami /> */}
        <Footer />
      </>
    );
  }
}
