import React from "react";
import Img from "../assets/3.webp";
import { Link } from "react-router-dom";
const SuccessPage = () => {
  return (
    <div className="w-full flex flex-col justify-center h-screen items-center gap-[20px] p-[20px]">
      <img src={Img} alt="img" className="w-[40%] rounded-[20px]" />
      <Link
        to={"/user"}
        className="px-[20px] py-[12px] rounded-[7px] bg-[#080808] text-white"
      >
        Go To Dashboard
      </Link>
    </div>
  );
};

export default SuccessPage;
