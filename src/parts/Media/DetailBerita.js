/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailBerita = () => {
  const { slug } = useParams();
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/userberita/${slug}`)
      .then((response) => {
        setBerita(response.data);
      })
      .catch((error) => {
        console.error('Error fetching berita:', error);
      });
  }, [slug]);

  // Pengecekan untuk memastikan 'berita' sudah ada sebelum merender
  if (!berita) {
    return (
      <div className="my-10 px-5 lg:px-52">
        {/* Skeleton Loader for Title */}
        <div className="skeleton skeleton-title mb-4"></div>

        {/* Skeleton Loader for Date */}
        <div className="skeleton skeleton-text mb-4"></div>

        {/* Skeleton Loader for Image */}
        <div className="skeleton skeleton-image mb-6"></div>

        {/* Skeleton Loader for Content */}
        <div className="skeleton skeleton-text mb-4"></div>
        <div className="skeleton skeleton-text mb-4"></div>
        <div className="skeleton skeleton-text mb-4"></div>

        {/* Skeleton Loader for Author */}
        <div className="skeleton skeleton-text mb-4"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb bg-gray-100 py-6 px-5 lg:px-52">
        <nav className="text-lg text-gray-600">
          <ul className="flex space-x-2">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>{`>`}</li>
            <li>
              <a href="/media" className="hover:text-blue-600">
                Media
              </a>
            </li>
            <li>{`>`}</li>
            <li>
              <a href="/media/berita" className="hover:text-blue-600">
                Berita
              </a>
            </li>
            <li>{`>`}</li>
            <li className="text-gray-500">
              {berita.title.length > 12 ? `${berita.title.substring(0, 12)}...` : berita.title}
            </li>
          </ul>
        </nav>
      </div>

      {/* Detail Berita */}
      <div className="my-10 px-5 lg:px-52">
        <h1 className="text-2xl font-semibold mb-4">{berita.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{berita.published_date}</p>

        <div className="mb-6">
          <img
            src={`http://localhost:8000${berita.image_url}`}
            alt={berita.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* <div className="text-base text-gray-700 mb-4 leading-relaxed">{berita.content}</div> */}
        <div className="text-base text-gray-700 mb-4 leading-relaxed">
          <div
            dangerouslySetInnerHTML={{
              __html: berita.content,
            }}
          />
        </div>

        <div className="text-sm text-gray-500">
          <p>Author: {berita.author}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailBerita;
