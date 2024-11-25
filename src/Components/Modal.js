import React, { useEffect, useState } from "react";
import ChatAppInstructions from "./Markdown";
import { useRouter } from "next/navigation";

export default function Modal({ showModal, setShowModal }) {
  //   const [showModal, setShowModal] = React.useState(true);
  const router = useRouter();
  const [ischat, setIschat] = useState(false);
  useEffect(() => {
    async function foo() {
      const token = await localStorage.getItem("Token");
      if (!token) {
        setIschat(false);
      } else {
        setIschat(true);
      }
    }
    foo();
  }, []);
  function foo() {
    if (ischat) {
      router.push("/chats");
    } else {
      router.push("/login");
    }
  }
  // return (
  //   <>
  //     {showModal ? (
  //       <>
  //         {/* Modal Container */}
  //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  //           {/* Modal Content */}
  //           <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
  //             {/* Modal Body */}
  //             <div className="p-6">
  //               <ChatAppInstructions />
  //             </div>
  
  //             {/* Modal Footer */}
  //             <div className="flex items-center justify-end p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
  //               <button
  //                 className="px-5 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition-all duration-200"
  //                 type="button"
  //                 onClick={() => {
  //                   foo();
  //                 }}
  //               >
  //                 {ischat ? "Start Chatting" : "Login"}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  
  //         {/* Background Overlay */}
  //         <div className="fixed inset-0 z-40 bg-black bg-opacity-25"></div>
  //       </>
  //     ) : null}
  //   </>
  // );
  
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <ChatAppInstructions />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      foo();
                    }}
                  >
                    {ischat ? "Start Chatting" : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
