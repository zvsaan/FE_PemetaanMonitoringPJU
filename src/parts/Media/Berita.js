/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Berita = () => {
  const [berita, setBerita] = useState([]);
  const [sortOption, setSortOption] = useState('terbaru');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBerita(1); // Load berita on initial render
  }, []);

  const fetchBerita = (page) => {
    setIsLoading(true); // Start loading
    axios
      .get(`http://localhost:8000/api/userberita?page=${page}`)
      .then((response) => {
        setBerita(response.data.data);
        setPagination({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          totalPages: response.data.total_pages,
        });
        setIsLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching berita:", error);
        setIsLoading(false); // End loading
      });
  };

  const sortBerita = (beritaData, option) => {
    if (!Array.isArray(beritaData)) return beritaData;

    return beritaData
      .filter((item) => item.published_date && item.title)
      .sort((a, b) => {
        switch (option) {
          case 'terbaru':
            return new Date(b.published_date) - new Date(a.published_date);
          case 'terlama':
            return new Date(a.published_date) - new Date(b.published_date);
          case 'az':
            return a.title.localeCompare(b.title);
          case 'za':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
  };

  const sortedBerita = sortBerita(berita, sortOption);

  const handlePagination = (page) => {
    if (page < 1 || page > pagination.lastPage) return;
    fetchBerita(page);
  };

  return (
    <div className="px-5 lg:px-52 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Semua Berita</h1>
        <div className="ml-auto">
          <label htmlFor="sort" className="mr-3 text-sm text-gray-700">
            Urutkan:
          </label>
          <select
            id="sort"
            className="border border-gray-300 rounded py-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlama">Terlama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex mb-10">
              <div className="w-1/3 mr-5">
                <div className="skeleton skeleton-image"></div>
              </div>
              <div className="w-2/3">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-paragraph"></div>
                <div className="skeleton skeleton-paragraph"></div>
                <div className="skeleton skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      ) : berita.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p>Tidak ada berita yang tersedia.</p>
        </div>
      ) : (
        sortedBerita.map((item) => (
          <div key={item.id_berita} className="flex mb-10">
            <div className="w-1/3 mr-5">
              <img
                src={`http://localhost:8000${item.image_url}`}
                alt={item.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-2/3">
              <p className="text-sm text-gray-500 mb-2">{item.published_date}</p>
              <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
              <p className="text-base text-gray-700 mb-4">
                {item.content.slice(0, 150)}...
              </p>
              <Link
                to={`/media/berita/${item.slug}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Selengkapnya
              </Link>
            </div>
          </div>
        ))
      )}

      {berita.length > 0 && (
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => handlePagination(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePagination(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.lastPage}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Berita;