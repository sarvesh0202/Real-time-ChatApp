"use client";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
const backend = process.env.NEXT_PUBLIC_API;
const SearchModal = ({ search, users, setusers }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [added, setAdded] = useState([]);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) setSearchResults([]);
  }, [searchQuery]);

  const searchUserName = async () => {
    if (!searchQuery.trim()) return;
    const token = localStorage.getItem("Token");
    if (!token) {
      alert("Authentication token is missing");
      return;
    }
    try {
      const { data } = await axios.get(
        `${backend}/search/?search=${searchQuery}`,
        { headers: { Authorization: token } }
      );
      setSearchResults(data);
    } catch (err) {
      alert("Internal Server Error");
      console.log(err);
      closeModal();
    }
  };

  const closeModal = () => {
    search(false);
    setSearchQuery("");
    document.body.style.overflow = "unset";
  };
  async function handleAdd(res) {
    const token = localStorage.getItem("Token");
    if (!token) {
      alert("Authentication token is missing");
      return;
    }
    console.log(res);
    setAdded((prev) => [...prev, res._id]);
    try {
      const { data } = await axios.post(
        `${backend}/users/add`,
        {
          _id: res._id,
        },
        { headers: { Authorization: token } }
      );
      setusers((prev)=>[...prev,res])
    } catch (err) {
      console.log(err);
    }
    // console.log(added);
  }
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div className="relative">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 px-4"
        onClick={handleClickOutside}
        role="dialog"
        aria-modal="true"
        aria-label="Search modal"
      >
        <div
          ref={modalRef}
          className="w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <div className="flex items-center p-4 border-b border-gray-200">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full bg-transparent border-none focus:outline-none text-lg"
                aria-label="Search input"
              />
              <FaSearch
                className="text-gray-400 mr-3 cursor-pointer"
                onClick={searchUserName}
              />
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close search"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            <div
              className="max-h-[60vh] overflow-y-auto p-4"
              aria-live="polite"
            >
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className="p-4 hover:bg-gray-50  flex justify-between rounded-lg cursor-pointer transition-colors duration-200 mb-2"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {result.username}
                  </h3>
                  {!added.some((id) => id === result._id) &&
                    !users.some((id) => id._id == result._id) && (
                      <div
                        className="rounded-sm hover:bg-teal-100 border-2 p-2"
                        onClick={() => {
                          handleAdd(result);
                        }}
                      >
                        Add friends
                      </div>
                    )}
                </div>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  "Click on Search icon to Search {searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
  //     onClick={handleClickOutside}
  //     role="dialog"
  //     aria-modal="true"
  //     aria-label="Search Modal"
  //   >
  //     <div
  //       ref={modalRef}
  //       className="w-full max-w-lg bg-white rounded-lg shadow-xl p-4 relative"
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       {/* Modal Header */}
  //       <div className="flex justify-between items-center border-b pb-2 mb-4">
  //         <h2 className="text-xl font-semibold text-gray-800">Search Users</h2>
  //         <button
  //           className="text-gray-400 hover:text-gray-600"
  //           onClick={closeModal}
  //           aria-label="Close Modal"
  //         >
  //           ✖
  //         </button>
  //       </div>
  
  //       {/* Search Input */}
  //       <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
  //         <input
  //           ref={inputRef}
  //           type="text"
  //           placeholder="Search for friends..."
  //           className="flex-grow bg-transparent focus:outline-none text-gray-800"
  //           value={searchQuery}
  //           onChange={(e) => setSearchQuery(e.target.value)}
  //           aria-label="Search Input"
  //         />
  //         <button
  //           className="text-indigo-500 hover:text-indigo-700"
  //           onClick={searchUserName}
  //           aria-label="Search"
  //         >
  //           🔍
  //         </button>
  //       </div>
  
  //       {/* Search Results */}
  //       <div className="max-h-72 overflow-y-auto">
  //         {searchResults.map((result) => (
  //           <div
  //             key={result._id}
  //             className="flex justify-between items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer mb-2"
  //           >
  //             <div className="text-gray-800">{result.username}</div>
  //             {!added.some((id) => id === result._id) &&
  //               !users.some((user) => user._id === result._id) && (
  //                 <button
  //                   className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600"
  //                   onClick={() => handleAdd(result)}
  //                 >
  //                   Add Friend
  //                 </button>
  //               )}
  //           </div>
  //         ))}
  //         {searchQuery && searchResults.length === 0 && (
  //           <div className="text-gray-500 text-center py-4">
  //             No results found for "{searchQuery}".
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  
};

export default SearchModal;
