/* eslint-disable */
import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setChatHistory([]); // Reset chat history when closing
      setUserInput("");
    }
  };

  const faqs = [
    {
      question: "Apa itu TTMT?",
      answer: "TTMT adalah singkatan dari Tri Tunggal Madiun Terang, sebuah organisasi yang menyediakan berbagai layanan terkait penerangan jalan."
    },
    {
      question: "Apa saja layanan yang disediakan oleh Tri Tunggal Madiun Terang?",
      answer: "TTMT menyediakan layanan seperti perbaikan lampu jalan, pengaduan kerusakan."
    },
    {
      question: "Dimana kita bisa melakukan pengaduan APJ?",
      answer: "Pengaduan dapat dilakukan melalui whatsApp atau dengan menghubungi layanan kita."
    }
  ];

  const additionalFAQs = [
    { question: "Bagaimana cara menghubungi TTMT?", answer: "Anda dapat menghubungi TTMT melalui nomor hotline kita atau email resmi yang tersedia di website kita." },
    { question: "Apa jam operasional TTMT?", answer: "TTMT beroperasi setiap hari dari pukul 08.00 hingga 17.00." },
    { question: "Apakah TTMT melayani pemasangan lampu jalan baru?", answer: "Tidak, kita hanya melakukan pemeliharaan terhadap lampu yang sudah dipasang" }
    // Tambahkan pertanyaan lainnya di sini
  ];

  const handleFAQClick = (faq) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: faq.question },
      { sender: "bot", message: faq.answer }
    ]);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = () => {
    if (userInput.trim()) {
      const matchedFAQ = [...faqs, ...additionalFAQs].find(faq => faq.question.toLowerCase() === userInput.trim().toLowerCase());

      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message: userInput },
        {
          sender: "bot",
          message: matchedFAQ ? matchedFAQ.answer : "Maaf, saya belum memiliki informasi untuk pertanyaan ini. Silakan hubungi layanan pelanggan TTMT untuk bantuan lebih lanjut."
        }
      ]);
      setUserInput("");
    }
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
            <h4 className="text-lg font-semibold">Tanya TTMT</h4>
            <FaTimes
              size={20}
              className="cursor-pointer"
              onClick={toggleChat}
            />
          </div>
          <div className="p-4">
            <div className="overflow-y-auto max-h-60">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    chat.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`inline-block px-4 py-2 rounded-lg text-sm ${
                      chat.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {chat.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-4">
              {chatHistory.length === 0 &&
                faqs.map((faq, index) => (
                  <button
                    key={index}
                    className="w-full text-left bg-gray-100 p-2 rounded-lg text-sm hover:bg-gray-200 transition"
                    onClick={() => handleFAQClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
            </div>

            <textarea
              rows="2"
              className="w-full border rounded-lg p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              placeholder="Ketik pertanyaan Anda..."
              value={userInput}
              onChange={handleInputChange}
            ></textarea>
            <button
              className="w-full bg-blue-500 text-white mt-2 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              onClick={handleUserSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;