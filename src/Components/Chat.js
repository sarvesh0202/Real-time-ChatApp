import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
const backend = process.env.NEXT_PUBLIC_API;
function Chat({ id, name }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatid] = useState("");
  const [Token, setToken] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setToken(token);

    socketRef.current = io(backend);
    socketRef.current.on("connected", () => setSocketConnected(true));

    fetch(`${backend}/login/protected`, {
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((body) => {
        socketRef.current.emit("setup", body.UserData.Id);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${backend}/message`,
          { userId: id },
          { headers: { Authorization: Token } }
        );
        setChatid(response.data._id);
        socketRef.current.emit("join chat", response.data._id);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (Token && id) fetchData();
  }, [id, Token]);

  useEffect(() => {
    const handleReceivedMessage = (newMessageReceived) => {
      console.log(chatId, newMessageReceived.chat);

      if (newMessageReceived.chat != chatId) {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    };
    console.log("receiver mounted");
    socketRef.current.on("message received", handleReceivedMessage);

    return () => {
      socketRef.current.off("message received", handleReceivedMessage);
    };
  }, [id]);

  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post(
        `${backend}/message/createMessage`,
        { chat: chatId, content: newMessage },
        { headers: { Authorization: Token } }
      );
      // setMessages((prevMessages) => [...prevMessages, data]);
      socketRef.current.emit("new message", data);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div class="flex-1">
      {/* <!-- Chat Header --> */}
      <header class="bg-white p-4 text-gray-700">
        <h1 class="text-2xl font-semibold">{name}</h1>
      </header>

      {/* <!-- Chat Messages --> */}
      <div class="h-screen overflow-y-auto p-4 pb-36">
        {messages.map((message, index) =>
          message.sender == id ? (
            <div class="flex mb-4 cursor-pointer">
              <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
               
              </div>
              <div class="flex max-w-96 bg-slate-200 rounded-lg p-3 gap-3">
                <p class="text-gray-700"> {message.content}</p>
              </div>
            </div>
          ) : (
            <div class="flex justify-end mb-4 cursor-pointer">
              <div class="flex max-w-96 bg-green-600 text-white rounded-lg p-3 gap-3">
                <p>{message.content}</p>
              </div>
              <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                
              </div>
            </div>
          )
        )}

        {/* <!-- Incoming Message --> */}

        {/* <!-- Outgoing Message --> */}
      </div>

      {/* <!-- Chat Input --> */}
      <footer class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-green-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            class="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
  // return (
  //   <div className="flex-1 flex flex-col">
  //     {/* Chat Header */}
  //     <header className="p-4 bg-white shadow-md border-b border-gray-200 flex justify-between items-center">
  //       <h1 className="text-lg font-semibold text-gray-700">{name || "Chat"}</h1>
  //       <button
  //         className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600"
  //         onClick={logoutHandler}
  //       >
  //         Logout
  //       </button>
  //     </header>
  
  //     {/* Chat Messages */}
  //     <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
  //       {messages.map((message, index) => (
  //         <div
  //           key={index}
  //           className={`flex mb-4 ${
  //             message.sender === id ? "justify-start" : "justify-end"
  //           }`}
  //         >
  //           <div
  //             className={`max-w-md p-3 rounded-lg shadow ${
  //               message.sender === id
  //                 ? "bg-gray-200 text-gray-800"
  //                 : "bg-indigo-500 text-white"
  //             }`}
  //           >
  //             {message.content}
  //           </div>
  //         </div>
  //       ))}
  //       {messages.length === 0 && (
  //         <div className="text-center text-gray-500 py-10">
  //           No messages yet. Start the conversation!
  //         </div>
  //       )}
  //     </div>
  
  //     {/* Chat Input */}
  //     <footer className="p-4 bg-white border-t flex items-center">
  //       <input
  //         type="text"
  //         placeholder="Type a message..."
  //         className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
  //         value={newMessage}
  //         onChange={(e) => setNewMessage(e.target.value)}
  //       />
  //       <button
  //         className="ml-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
  //         onClick={handleSendMessage}
  //       >
  //         Send
  //       </button>
  //     </footer>
  //   </div>
  // );
  
}

export default Chat;
