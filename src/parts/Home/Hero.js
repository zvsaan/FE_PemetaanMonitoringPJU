/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React from "react";

import { Fade } from "react-awesome-reveal";

import Button from "elements/Button";

import BuildWebsite from "../../assets/images/hero/Company.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="w-full lg:w-1/2 xl:pl-12 sm:pr-2 mt-8">
      <h2 className="text-5xl sm:text-6xl text-theme-blue font-bold leading-tight mb-2">
        Lighting the Way Elevating Safety Standards
      </h2>

      <p className="font-light text-xl text-gray-400 leading-relaxed mb-12">
        Menerangi Madiun, memastikan kenyamanan jalan.
      </p>
        <Fade direction="up" delay={500} triggerOnce>
          <Button
            href="/berita"
            type="link"
            className="inline-flex items-center px-5 py-4 text-white text-lg bg-theme-purple rounded-lg shadow-2xl hover:bg-dark-theme-purple transition duration-200"
          >
            Baca Selengkapnya
            <svg
              className="ml-2 w-5 h-5 text-white animate-bounce-x"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Fade>
      </div>
      <div className="flex md:w-fit w-full justify-center items-center order-first md:order-first lg:order-last lg:w-1/2">
        <Fade direction="up" triggerOnce>
          <img className="" src={BuildWebsite} alt="Build Website" />
        </Fade>
      </div>
    </section>
  );
}
