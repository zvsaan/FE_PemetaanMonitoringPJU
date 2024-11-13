/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { Fade } from 'react-awesome-reveal';
import { Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

import Button from '../elements/Button';
import BrandIcon from './BrandIcon';

import Logo from '../assets/images/logo/logo.png';

export default function Header() {
  const [isCollapse, setIsCollapse] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false); // State for Data dropdown
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="header">
      <div className="flex justify-between px-4 lg:px-0">
      <img src={Logo} alt="Logo" className=" mr-4 w-7 h-7" />
        <BrandIcon />

        <button className="block text-theme-blue lg:hidden focus:outline-none" onClick={() => setIsCollapse(!isCollapse)}>
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path className={`${isCollapse ? 'hidden' : 'block'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            <path className={`${!isCollapse ? 'hidden' : 'block'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ul className="hidden text-theme-blue tracking-widest items-center lg:flex flex-row mt-0">
        <li>
          <Button
            className={`${path === '/' ? 'active-link' : ''} font-medium text-lg px-5 no-underline hover:underline`}
            type="link"
            href="/"
          >
            Home
          </Button>
        </li>

        {/* Data with Dropdown */}
        <li className="relative group">
          <Button
            className={`${path.startsWith('/data') ? 'active-link' : ''} font-medium text-lg px-5 no-underline hover:underline flex items-center`}
            type="button"
            onClick={() => setIsDataOpen(!isDataOpen)}
          >
            Data
            <svg
              className={`ml-2 w-4 h-4 transform transition-transform duration-200 ${isDataOpen ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          {isDataOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
              <li>
                <Button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  type="link"
                  href="/data/pemetaan-pju"
                >
                  Pemetaan PJU
                </Button>
              </li>
              <li>
                <Button
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  type="link"
                  href="/data/data-pju"
                >
                  Data PJU
                </Button>
              </li>
            </ul>
          )}
        </li>

        <li className="py-2 lg:py-0">
          <Button
            className={`${path === '/team' ? 'active-link' : ''} font-medium text-lg px-5 no-underline hover:underline`}
            type="link"
            href="/team"
          >
            Team
          </Button>
        </li>
        <li className="py-2 lg:py-0">
          <Button
            className={`${path === '/berita' ? 'active-link' : ''} font-medium text-lg px-5 no-underline hover:underline`}
            type="link"
            href="/berita"
          >
            Media
          </Button>
        </li>
        <li>
          <Button
            className="font-medium text-lg mx-auto ml-3 px-6 py-2 bg-theme-purple text-white rounded-full border-2 border-theme-purple hover:bg-dark-theme-purple border-purple-800 transition duration-200"
            type="link"
            href="/login"
          >
            Login Admin
          </Button>
        </li>
      </ul>

      <Transition
        show={isCollapse}
        enter="transition-opacity duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="transition duration-300 ease-in data-[closed]:opacity-0">
          <ul className="z-50 flex flex-col text-theme-blue tracking-widest my-6 absolute bg-white w-full border-b-2 border-gray-300 lg:hidden">
            <li className="py-2 bg-white">
              <Button
                className={`${path === '/' ? 'active-link' : ''} font-medium px-10 no-underline hover:underline`}
                type="link"
                href="/"
              >
                Home
              </Button>
            </li>

            {/* Data with Dropdown in Mobile */}
            <li className="py-2 bg-white relative">
              <Button
                className="font-medium px-10 no-underline hover:underline flex justify-between w-full"
                type="button"
                onClick={() => setIsDataOpen(!isDataOpen)}
              >
                Data
                <svg
                  className={`ml-2 w-4 h-4 transform transition-transform duration-200 ${isDataOpen ? 'rotate-180' : 'rotate-0'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              {isDataOpen && (
                <ul className="mt-2 ml-10">
                  <li className="py-2">
                    <Button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      type="link"
                      href="/data/pemetaan-pju"
                    >
                      Pemetaan PJU
                    </Button>
                  </li>
                  <li className="py-2">
                    <Button
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      type="link"
                      href="/data/data-pju"
                    >
                      Data PJU
                    </Button>
                  </li>
                </ul>
              )}
            </li>

            <li className="py-2 bg-white">
              <Button
                className={`${path === '/team' ? 'active-link' : ''} font-medium px-10 no-underline hover:underline`}
                type="link"
                href="/team"
              >
                Team
              </Button>
            </li>
            <li className="py-2 bg-white">
              <Button
                className={`${path === '/berita' ? 'active-link' : ''} font-medium px-10 no-underline hover:underline`}
                type="link"
                href="/berita"
              >
                Media
              </Button>
            </li>
            <li className="mx-auto my-9 bg-white">
              <Button
                className="font-bold mx-auto px-5 py-2 bg-theme-purple text-white rounded-full border-2 border-theme-purple hover:bg-dark-theme-purple border-purple-800 transition duration-200"
                type="link"
                href="/login"
              >
                Login Admin
              </Button>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
}