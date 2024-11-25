"use client";

import React, { useContext, useEffect, useState } from "react";
import "../app/login/login.css"
import { myContext } from "../../Helper/Context";
import gsap from "gsap";
import axios from "axios";
import { useRouter } from "next/navigation";
const backend = process.env.NEXT_PUBLIC_API;
function Login() {
  const { login, setLogin } = useContext(myContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const changeState = ()=>
  // {
  //     setLogin(!login);
  // }

  useEffect(() => {
    console.log("Effect triggered");
    const t = gsap.timeline();

    t.to(".sign-in-title", {
      x: 10,
      opacity: 1,
      duration: 1,
    });
  }, []);
  async function changeState(e) {
    e.preventDefault();
    var g = {
      username,
      password,
    };
    try {
      const response = await axios.post(`${backend}/login`, g);
      // console.log(response.data);
      if (response.data.success) {
        // setdata(response.data.User);
        // console.log(response.data);
        await localStorage.setItem("Token", response.data.token);
        //  console.log(data);
        await router.push("/chats");
        return null;
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  // return (
  //   <div className="s3">
  //     <div className="sign-header-section">
  //       <div className="sign-in-title">Heyy, Welcome Back!</div>
  //     </div>
  //     <div className="sign-buttons">
        
  //     </div>
  //     <div className="slice-container">
  //       <div className="slice-text-c">
  //         <div className="slicer"></div>
  //         <div className="slice-text">Or with email</div>
  //       </div>
  //     </div>
  //     <form className="input-container">
  //       <input
  //         type="text"
  //         value={username}
  //         required
  //         placeholder="username"
  //         onChange={(e) => {
  //           setUsername(e.target.value);
  //         }}
  //       />
  //       <input
  //         type="password"
  //         value={password}
  //         required
  //         placeholder="Passowrd"
  //         onChange={(e) => {
  //           setPassword(e.target.value);
  //         }}
  //       />
  //       <a href="#" className="alt-f">
  //         Forgot Password ?
  //       </a>
  //       <button
  //         onClick={changeState}
  //         className="hover:rounded-[2vw] rounded-[1vw]"
  //       >
  //         Sign in
  //       </button>
  //       <div href="#" className="alt-f-full">
  //         Not a Member yet?
  //         <button
  //           className="p-[.2vw] hover:rounded-[2vw]  transition-all w-full duration-1 ease-out border-blue-300 hover:border-b alt-f ml-[0.2vw]"
  //           onClick={() => {
  //             setLogin(false);
  //           }}
  //         >
  //           Sign up
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="auth-form">
      <h2>Welcome Back</h2>
      <form>
        <input
          type="text"
          value={username}
          required
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <button onClick={changeState} className="auth-button">
          Sign In
        </button>
        <p className="toggle-auth">
          Not a member?{" "}
          <span onClick={() => setLogin(false)} className="toggle-link">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
  
}

export default Login;
