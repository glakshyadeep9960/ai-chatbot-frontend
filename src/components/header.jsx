import React, { useState } from "react";
import { FaBarsStaggered, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
const SiteHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className="p-[15px]  text-white flex items-center justify-between w-full fixed top-0 left-0 bg-[#070c18]">
      <Link to={"/user"}>
        <h2 className=" font-medium text-[26px]">Fresher's Idea</h2>
      </Link>
      <ul className="hidden xl:flex items-center gap-[20px]">
        <Link to={"/user/ai-chatbot"}>AI CHATBOT</Link>
        <Link to={"/user/pricing"}>PRICING</Link>
        <Link to={"/user/contact"}>CONTACT</Link>
      </ul>
      <div className=" hidden xl:flex items-center gap-[12px]">
        <button className="px-[20px] py-[12px] bg-black rounded-[7px] text-white">
          Logout
        </button>
      </div>
      <FaBarsStaggered
        onClick={handleOpenSidebar}
        className="text-[20px] text-white cursor-pointer xl:hidden"
      />
      <div
        className={`absolute left-0 top-0 w-full h-screen text-white bg-black sm:w-[50%] xl:hidden  ${
          openSidebar === true ? "translate-x-0" : "translate-x-[-100vw]"
        } p-[20px] transition-all flex flex-col gap-[20px]`}
      >
        <FaX
          onClick={handleOpenSidebar}
          className="xl:hidden cursor-pointer self-end"
        />
        <ul className="flex flex-col items-center gap-[20px]">
          <Link to={"/user/ai-chatbot"}>AI CHATBOT</Link>
          <Link to={"/user/pricing"}>PRICING</Link>
          <Link to={"/user/contact"}>CONTACT</Link>
        </ul>
        <div className=" flex justify-center items-center gap-[12px]">
          <button className="px-[20px] py-[12px] bg-white rounded-[7px] text-black">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
