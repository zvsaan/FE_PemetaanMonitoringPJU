/* eslint-disable */
import React, { Component } from 'react';

import Footer from 'parts/Footer';
import Header from 'parts/Header';
import HeroTeamKami from 'parts/Hero/tentangkami/HeroTeamKami';
import TeamKami from 'parts/TentangKami/TeamKami';

export default class TeamKamiPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header />
        <HeroTeamKami />
        <TeamKami />
        <Footer />
      </>
    );
  }
}
