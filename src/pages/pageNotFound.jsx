import React from "react";
import Img from "../assets/404-computer.svg";
import { Link, useLocation } from "react-router-dom";

const PageNotFound = () => {
  const location = useLocation();

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen  gap-[12px]">
      <div className="w-[70%] xl:w-[30%]">
        <img
          src={Img}
          alt="pageNotFound"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-blue-950 font-semibold text-[20px]">
        404 Not Found!
      </h2>
      <h1 className="text-[35px] font-semibold">
        Whoops! That Page Doesn't Exist.
      </h1>
      <Link
        to={location.pathname.startsWith("/user") ? "/user" : "/"}
        className="px-[20px] py-[7px] rounded-[7px] bg-black text-white"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
