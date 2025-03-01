import React from "react";
import Img from "../assets/1.avif";
import { useLocation } from "react-router-dom";
const AuthLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center  ">
      <div className="w-full bg-white rounded-[7px] flex gap-[20px] items-stretch h-full">
        <div className="w-full xl:w-[55%] p-[30px] flex flex-col items-center gap-[20px] justify-center">
          <h1 className="font-bold text-center text-[28px]">
            {location.pathname === "/auth/user/login"
              ? "Welcome Back!"
              : location.pathname === "/auth/user/register"
              ? "Register With Ease!"
              : location.pathname === "/auth/user/forgot-password"
              ? "Forgot Password?"
              : null}
          </h1>
          <p>
            Simplify your workflow and boost your productivity with <br /> Our
            Software.
          </p>
          {children}
        </div>
        <div className="hidden w-[50%] bg-[#f6faf4] xl:flex flex-col items-center gap-[20px] p-[30px] justify-center">
          <img src={Img} alt="img" className="w-[80%] rounded-[20px]" />
          <h2 className="font-semibold text-[28px] text-center">
            Make Your Work Easier With Our <br />
            Software.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
