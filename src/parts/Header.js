/* eslint-disable */
import logo from 'assets/images/logo/logo.png';
import { useEffect, useState } from 'react';
import { FaBars, FaLinkedin, FaSignInAlt, FaTimes, FaYoutube } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('ID');
  const [navbarItems, setNavbarItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch navbar items from API
  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const response = await fetch('https://be-sigap.tifpsdku.com/api/navbar');
        const data = await response.json();
        setNavbarItems(data);
      } catch (error) {
        console.error('Error fetching navbar items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarItems();
  }, []);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle language change
  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // Function to render navbar items recursively with original styling
  const renderNavbarItems = (items) => {
    return items.map((item) => {
      if (item.type === 'dropdown' && item.children.length > 0) {
        return (
          <li key={item.id} className='group max-lg:border-b max-lg:border-white max-lg:py-3 relative'>
            <a className='text-white hover:text-blue-400 text-[15px] font-bold lg:hover:fill-[#007bff] block cursor-pointer'>
              {item.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24">
                <path d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z" fill="white" />
              </svg>
            </a>
            <ul className='absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500'>
              {item.children.map((child) => (
                <li key={child.id} className='border-b py-2'>
                  <a href={child.url} className='text-black hover:text-[#007bff] text-[15px] font-bold block'>
                    {child.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        );
      } else {
        return (
          <li key={item.id} className='max-lg:border-b max-lg:border-white max-lg:py-3'>
            <a href={item.url} className='text-white hover:text-blue-400 text-[15px] font-bold block'>
              {item.title}
            </a>
          </li>
        );
      }
    });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      {/* Navbar untuk pilihan bahasa dan media sosial */}
      <div className={`bg-transparent text-white py-4 border-transparent ${isScrolled ? 'bg-black border-white' : ''}`}>
        <div className="flex items-center justify-between px-5 lg:px-28">
          {/* Pilihan bahasa */}
          <div className="text-sm">
            <span
              className={`mr-4 cursor-pointer ${language === 'EN' ? 'text-blue-400' : 'hover:text-blue-400'}`}
              onClick={() => toggleLanguage('EN')}
            >
              EN
            </span>
            |
            <span
              className={`ml-4 cursor-pointer ${language === 'ID' ? 'text-blue-400' : 'hover:text-blue-400'}`}
              onClick={() => toggleLanguage('ID')}
            >
              IND
            </span>
          </div>

          {/* Media sosial */}
          <div className="flex gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400">
              <FaYoutube size={20} />
            </a>
            <a href="/login" className="text-white hover:text-blue-400">
              <FaSignInAlt size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className="mx-5 lg:mx-28" style={{ height: '0.2px', backgroundColor: '#ccc', border: 'none' }} />

      {/* Navbar utama dengan logo dan menu */}
      <div className="flex items-center justify-between px-5 lg:px-28 py-3 gap-4 w-full">
        {/* Logo Section */}
        <a href="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src={logo} className="h-8" alt="TTMT Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            <span className="hidden lg:inline">PT TRI TUNGGAL MADIUN TERANG</span>
            <span className="lg:hidden">PT TTMT</span>
          </span>
        </a>

        {/* Menu Toggle for mobile */}
        <button onClick={handleMenuToggle} className="lg:hidden">
          <FaBars className="w-7 h-7 text-white" />
        </button>

        {/* Menu Section */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          <button
            onClick={handleMenuToggle}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <FaTimes className="w-4 h-4 text-black" />
          </button>

          {loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <ul className='lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
              {renderNavbarItems(navbarItems)}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;