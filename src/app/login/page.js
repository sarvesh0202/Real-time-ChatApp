"use client";

import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import gsap from "gsap";
import Login from "@/Components/Login-form";
import Register from "@/Components/Register-form";
import { myContext } from "../../../Helper/Context";

function Page() {
  const { login, setLogin } = useContext(myContext);

  useEffect(() => {
    const t = gsap.timeline();

    t.to(".intro-title", {
      y: -10,
      opacity: 1,
      duration: 0.5,
      scale: 1.05,
    });
  }, []);

  // return (
  //   <div className="sign-in-container">
  //     <div className="sign-column s1">
  //       <div className="sign-column-face s2">
  //         {login ? <Login /> : <Register />}
  //       </div>
  //     </div>

  //     <div className="sign-column w2">
  //       <div className="intro-p">
  //         <div className="canvas-logo"></div>

  //         <div className="intro-content">
  //           <div className="intro-title">Welcome To Chatliie</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="page-container">
      <div className="auth-section">
        <div className="auth-card">
          {login ? <Login /> : <Register />}
        </div>
      </div>
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="intro-title">Welcome to Chatify</h1>
          <p>Experience seamless communication like never before!</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
