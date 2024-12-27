/* eslint-disable */
import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Icon Button */}
      <div
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        onClick={toggleChat}
        style={{ zIndex: 1000 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </div>

      {/* Popup Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold">Tanya AI</h4>
            <FaTimes
              size={20}
              className="cursor-pointer"
              onClick={toggleChat}
            />
          </div>
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-4">
              Halo! Saya di sini untuk membantu. Ada yang bisa saya bantu?
            </p>
            <div className="space-y-2">
              <button className="w-full text-left bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition">
                Saya ingin membuat website
              </button>
              <button className="w-full text-left bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition">
                Saya ingin migrasi hosting
              </button>
              <button className="w-full text-left bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition">
                Saya bingung memilih paket hosting
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <textarea
              rows="2"
              className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ketik pertanyaan Anda..."
            ></textarea>
            <button className="w-full bg-blue-500 text-white mt-2 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
              Kirim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;