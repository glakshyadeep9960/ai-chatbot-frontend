import axios from "axios";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { baseUrl } from "../utils/apiSettings";
import ParentLayout from "../layouts/parentLayout";

const PricingPage = () => {
  const token = localStorage.getItem("userToken");
  const handleMonthlyPlan = async () => {
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/user/checkout`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        plan: "monthly",
      },
    })
      .then((res) => {
        console.log(res?.data?.url);
        window.location.href = res?.data?.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleYearlyPlan = async () => {
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/user/checkout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        plan: "yearly",
      },
    })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ParentLayout>
      <div className="w-full flex flex-col items-center gap-[40px] bg-[#070c18] xl:h-full p-[20px] sm:p-[80px]">
        <div className="w-full flex flex-col items-center gap-[20px] text-[#5e5b9e]">
          <p className="border border-[#49477b] rounded-[100px] font-semibold text-[#5e5b9e] px-[12px] py-[7px] text-[14px]">
            Choose the pricing plan that suits your business
          </p>
          <h1 className="text-white text-[36px] sm:text-[52px] font-medium text-center w-full  xl:w-[60%] leading-[1.3em]">
            A Universal Tool for all your project needs at your price points
          </h1>
          <p>Here are the plans:</p>
        </div>
        <div className="w-full flex items-stretch flex-wrap xl:flex-nowrap justify-center gap-[20px]">
          <div className="w-full sm:w-[45%] xl:w-[30%] border border-[#49477b] p-[20px] flex flex-col gap-[20px] rounded-[20px]">
            <div className="w-full text-[#5e5b9e] flex flex-col gap-[7px]">
              <h3 className="text-white">Basic</h3>
              <p>For Monthly Basis</p>
              <h2 className="text-[52px] text-white">
                $0/<span className="text-[#5e5b9e] text-[14px]">PER MONTH</span>
              </h2>
              <div className="w-full text-[#5e5b9e] flex items-start justify-center flex-col gap-[7px] text-[15px]">
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <button className="bg-[#3b23ff] px-[20px] py-[12px] rounded-[7px] text-white">
              Subscribe Now
            </button>
          </div>

          <div className="w-full sm:w-[45%] xl:w-[30%] border border-[#49477b] p-[20px] flex flex-col gap-[20px] rounded-[20px]">
            <div className="w-full text-[#5e5b9e] flex flex-col gap-[7px]">
              <h3 className="text-white">Basic</h3>
              <p>For Monthly Basis</p>
              <h2 className="text-[52px] text-white">
                $10/
                <span className="text-[#5e5b9e] text-[14px]">PER MONTH</span>
              </h2>
              <div className="w-full text-[#5e5b9e] flex items-start justify-center flex-col gap-[7px] text-[15px]">
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleMonthlyPlan}
              className="bg-[#3b23ff] px-[20px] py-[12px] rounded-[7px] text-white"
            >
              Subscribe Now
            </button>
          </div>
          <div className="w-full sm:w-[45%] xl:w-[30%] border border-[#49477b] p-[20px] flex flex-col gap-[20px] rounded-[20px]">
            <div className="w-full text-[#5e5b9e] flex flex-col gap-[7px]">
              <h3 className="text-white">Yearly</h3>
              <p>For Yearly Basis</p>
              <h2 className="text-[52px] text-white">
                $500/
                <span className="text-[#5e5b9e] text-[14px]">PER YEAR</span>
              </h2>
              <div className="w-full text-[#5e5b9e] flex items-start justify-center flex-col gap-[7px] text-[15px]">
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet. amet.</p>
                </div>{" "}
                <div className="flex items-center gap-[7px]">
                  <FaCheck />
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleYearlyPlan}
              className="bg-[#3b23ff] px-[20px] py-[12px] rounded-[7px] text-white"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default PricingPage;
