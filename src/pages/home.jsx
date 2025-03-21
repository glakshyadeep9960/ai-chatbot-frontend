import React from "react";
import Img from "../assets/2.avif";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full pt-[50px] p-[20px] h-[350px] flex flex-col items-center gap-[20px]">
        <h1 className="text-[90px] leading-[1.3em] font-medium">
          Digital Strategies for the AI Age
        </h1>
        <p className="w-[20%] text-center text-[16px]">
          Personal Digital Marketing Solutions that Leverage AI.
        </p>
      </div>
      <div className="w-[98%]  flex items-stretch bg-[#823ffd] text-white">
        <div className="w-[50%] p-[20px] text-left flex flex-col items-start gap-[12px]">
          <h3 className="text-[26px] font-semibold w-[80%] leading-[1.3em]">
            I'm your way to go AI ChatBot. Click Here to get Assisted on Your
            Content Generation and Text Generation from Image.
          </h3>
          <button className="px-[40px] py-[12px] bg-white text-[#823ffd] font-semibold rounded-[50px]">
            Get Started
          </button>
        </div>
        <div className="w-[50%] flex items-center flex-col bg-[#d2a1ff]">
          <img src={Img} alt="img" className="mt-[-50px]" />
        </div>
      </div>
      <div className="w-[80%] flex flex-col items-start py-[50px]">
        <h2 className="text-[80px] text-left w-full border-b border-black mb-[15px]">
          About Us
        </h2>
        <h5 className="text-[25px] w-[80%] ml-[30px] text-left">
          Welcome to Fresher's Idea AI ChatBot, where we empower your business
          by creating the less Ai attractive content for your blogs. This
          ChatBot will help you in Improving Your Code by giving you the
          suggestions.
        </h5>
      </div>
    </div>
  );
};

export default Home;
