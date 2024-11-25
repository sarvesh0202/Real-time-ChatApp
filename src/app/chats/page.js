"use client";

import "./chats.css";
import Chat from "@/Components/Chat";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./searchbox";
import { myContext } from "../../../Helper/Context";
import { useRouter } from "next/navigation";
const backend = process.env.NEXT_PUBLIC_API;
function page() {
  const [users, setusers] = useState([]);
  const { userData, setUserData } = useContext(myContext);
  const [loading, setloading] = useState(true);
  const [Id, setid] = useState("");
  const [Chatpalet, setChatpalet] = useState(false);
  const [name, setname] = useState("");
  const [search, setsearch] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  useEffect(() => {
    async function fetchData() {
      const token = await localStorage.getItem("Token");
      if (!token) {
        await router.push("/login");
        return;
      }
      try {
        const { data } = await axios.get(`${backend}/users/getfriends`, {
          headers: { Authorization: token },
        });
        console.log(data);
        setloading(false);
        await setUserData(data);
        await setusers(data.friends);
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function logoutHandler(params) {
    localStorage.removeItem("Token");
    router.push("/login");
  }
  if (loading) {
    return <>loading</>;
  }
  async function handleClick(id, name) {
    setid((e) => {
      if (e == id) {
        setChatpalet(false);
        return "";
      } else {
        setChatpalet(true);
        return id;
      }
    });
    setname(name);
  }

  // return (
  //   <div class="flex h-screen overflow-hidden ">
  //     {/* <!-- Sidebar --> */}
  //     <div class="w-1/4 bg-white border-r border-gray-300 relative">
  //       {/* <!-- Sidebar Header --> */}
  //       <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
  //         <h1 class="text-2xl font-semibold">Chatliee</h1>
  //         <div class="relative">{/* <!-- Menu Dropdown --> */}</div>
  //         <button
  //           class="bg-white text-indigo-600 font-semibold py-1 px-3 rounded-md text-sm hover:bg-indigo-100 sm:text-xs sm:py-1 sm:px-2"
  //           onClick={() => {
  //             setsearch(true);
  //           }}
  //         >
  //           Search Friends
  //         </button>
  //       </header>
  //       {search && (
  //         <SearchModal search={setsearch} users={users} setusers={setusers} />
  //       )}
  //       {/* <!-- Contact List --> */}
  //       <div class="overflow-y-auto h-screen p-3 pb-16">
  //         {users.map((e, i) => (
  //           <div
  //             key={i}
  //             class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
  //             onClick={() => {
  //               handleClick(e._id, e.firstname);
  //             }}
  //           >
  //             <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
  //               {/* Add an avatar image here */}
  //             </div>
  //             <div class="flex-1">
  //               <h2 class="text-lg font-semibold">{e.firstname}</h2>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //       {/* <!-- Logout Button --> */}
  //       <div class="absolute bottom-0 left-0 w-full bg-indigo-600 text-white p-4 flex justify-center">
  //         <button
  //           class="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-md hover:bg-indigo-100 text-sm sm:text-xs sm:py-1 sm:px-4"
  //           onClick={logoutHandler}
  //         >
  //           Logout
  //         </button>
  //       </div>
  //     </div>

  //     {Chatpalet && <Chat id={Id} name={name} />}
  //   </div>
  // );
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 shadow-lg flex flex-col">
        {/* Sidebar Header */}
        <header className="p-4 bg-green-800 text-white flex justify-between items-center">
          <h1 className="text-xl font-semibold">Chatify</h1>
          <button
            className="bg-white text-green-800 font-medium py-2 px-4 rounded-lg text-sm hover:bg-indigo-100 transition"
            onClick={() => setsearch(true)}
          >
            Search Friends
          </button>
        </header>
  
        {/* Search Modal */}
        {search && (
          <SearchModal search={setsearch} users={users} setusers={setusers} />
        )}
  
        {/* Contact List */}
        <div className="overflow-y-auto flex-grow p-4">
          {users.map((e, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 mb-2 rounded-lg hover:bg-indigo-50 transition cursor-pointer"
              onClick={() => handleClick(e._id, e.firstname)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full">
                {/* Add an avatar image */}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-700">
                  {e.firstname}
                </h2>
              </div>
            </div>
          ))}
        </div>
  
        {/* Logout Button */}
        <div className="p-4 bg-green-800 text-white">
          <button
            className="w-full bg-white text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-indigo-100 transition"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
  
      {/* Chat Section */}
      {Chatpalet && <Chat id={Id} name={name} />}
    </div>
  );
  
  
}

export default page;
