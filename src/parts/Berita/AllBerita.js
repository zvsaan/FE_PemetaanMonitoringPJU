/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Tabs, TabPanel } from 'react-tabs';
import Button from 'elements/Button';

export default function AllBerita() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/userberita');
        const result = await response.json();

        // Filter only 'published' articles and sort by 'published_date' in descending order
        const publishedData = result
          .filter((item) => item.status === 'published')
          .sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

          const formattedData = publishedData.map((item) => ({
            ...item,
            imageUrl: `http://localhost:8000${item.image_url}`,
            slug: item.slug,
          }));          

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fade bottom>
      <section className="container mx-auto">
        <Tabs className="flex flex-col px-4">
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 xl:gap-8 justify-items-center">
              {data.map((item, index) => (
                <Fade triggerOnce direction="up" delay={200 * index} key={item.id}>
                  <Button type="link" href={`/berita/${item.slug}`}>
                    <div className="group rounded-2xl shadow-xl w-auto m-3 transform transition duration-500 hover:scale-110 portofolio-card">
                      <div className="relative">
                        <img src={item.imageUrl} alt={item.title} className="rounded-t-2xl z-0" />
                        <div className="absolute flex w-full h-full top-0 opacity-0 bg-black justify-center rounded-t-2xl img-hover">
                          <button className="focus:outline-none">
                            <svg
                              className="w-20 h-20 text-gray-200"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="py-4">
                        <h2 className="text-theme-blue text-center text-xl">{item.title}</h2>
                        <p className="font-light text-gray-400 text-center">{item.published_date}</p>
                      </div>
                    </div>
                  </Button>
                </Fade>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </Fade>
  );
}