import React from "react";
import { Link } from "react-router-dom";
const SiteHeader = () => {
  return (
    <div className="p-[15px]  text-white flex items-center justify-between w-full fixed top-0 left-0 bg-[#070c18]">
      <div>
        <h2 className=" font-medium text-[26px]">Fresher's Idea</h2>
      </div>
      <ul className="flex items-center gap-[20px]">
        <Link to={"/"}>AI CHATBOT</Link>
        <Link to={"/user/pricing"}>PRICING</Link>
        <Link to={"/user/contact"}>CONTACT</Link>
      </ul>
      <div className="flex items-center gap-[12px]">
        <button className="px-[20px] py-[12px] bg-black rounded-[7px] text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default SiteHeader;
