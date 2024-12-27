/* eslint-disable */
import React, { Component } from 'react';

import Button from 'elements/Button';

import NotFound from 'assets/images/404image.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class NotFoundPage extends Component {
  // handleRedirect = () => {
  //     window.location.href = '/';
  //   }
  // };

  render() {
    return (
      <div className="flex flex-col w-full h-screen justify-center bg-black">
        <div className="flex w-full justify-center">
          <img
            src={NotFound}
            alt="Not Found"
            className="w-1/2 max-w-xs object-contain hover:animate-brutal-move"
          />
        </div>
        <h1 className="text-white text-2xl text-center mt-5 px-5">
          Halaman ini tidak ada atau tidak dapat ditemukan
        </h1>
        {/* <div className="flex justify-center">
          <Button
            href='/'
            className="flex w-30 h-10 px-5 mt-5 bg-gray-600 text-white items-center rounded transform transition duration-500 hover:bg-gray-900"
          >
            Kembali
          </Button>
        </div> */}
      </div>
    );
  }
}