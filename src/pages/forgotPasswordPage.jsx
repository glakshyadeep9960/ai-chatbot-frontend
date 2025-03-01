import React from "react";
import Img from "../assets/1.avif";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/apiSettings";
import { showErrorMessage, showSuccessMessage } from "../utils/toast";
import AuthLayout from "../layouts/auth";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/user/forgot-password`,
      data: {
        email: inputValues.email,
      },
    })
      .then((res) => {
        console.log(res);
        showSuccessMessage(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        showErrorMessage(err?.response?.data?.message);
      });
  };
  return (
    <AuthLayout>
      <div className="w-full sm:w-[70%] text-[16px] flex flex-col gap-[12px]">
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={inputValues?.email}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Email Address..."
        />
        <button
          onClick={handleSubmit}
          className="w-full p-[15px]  rounded-[50px]  bg-black outline-none text-white"
        >
          Submit
        </button>
        <p>or</p>
        <Link className="self-center" to={"/auth/user/login"}>
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
