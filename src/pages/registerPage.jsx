import React from "react";
import Img from "../assets/1.avif";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/apiSettings";
import { showErrorMessage, showSuccessMessage } from "../utils/toast";
import AuthLayout from "../layouts/auth";
const RegisterPage = () => {
  const navigate = useNavigate();
  const handleSuccess = async (response) => {
    // Extract the token from the response
    const token = response.credential;

    try {
      // Initiate the passport authentication flow
      window.location.href = "http://localhost:8080/api/v1/auth/google";
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleFailure = (error) => {};

  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    await axios({
      method: "POST",
      url: `${baseUrl}/api/v1/user/register`,
      data: {
        name: inputValues?.name,
        phone: inputValues?.phone,
        address: inputValues?.address,
        email: inputValues.email,
        password: inputValues.password,
      },
    })
      .then((res) => {
        showSuccessMessage(res?.data?.message);
        navigate("/auth/user/login");
      })
      .catch((err) => {
        showErrorMessage(err?.response?.data?.message);
      });
  };
  return (
    <AuthLayout>
      <div className="w-full sm:w-[70%] text-[16px] flex flex-col gap-[12px]">
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={inputValues?.name}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Name..."
        />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={inputValues?.email}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Email Address..."
        />
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={handleChange}
          value={inputValues?.phone}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Contact No..."
        />

        <input
          type="text"
          name="address"
          id="address"
          onChange={handleChange}
          value={inputValues?.address}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Address..."
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputValues?.password}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Password..."
        />

        <button
          onClick={handleSubmit}
          className="w-full p-[15px]  rounded-[50px]  bg-black outline-none text-white"
        >
          Sign Up
        </button>
        <p>or</p>
        <button className="w-full self-center">
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </button>
        <Link className="self-center" to={"/auth/user/login"}>
          Login?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
