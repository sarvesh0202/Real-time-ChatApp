"use client";

import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../Helper/Context";
// import Navbar from "@/Components/Navbar";
// import Hero from "@/Components/Hero";
import Modal from "@/Components/Modal";
import { useRouter } from "next/navigation";

function Home() {
  const { userData, setUserData } = useContext(myContext);
  const firstName = userData.firstName; //Add userData.firstName after Auth is integrated
  const [showModal, setShowModal] = useState(1);
  const router = useRouter();


  return <div>
    <Modal showModal={showModal} setShowModal={setShowModal}/>
  </div>;
}

export default Home;
