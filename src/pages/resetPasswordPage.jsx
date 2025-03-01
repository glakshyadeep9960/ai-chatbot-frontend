import React from "react";
import Img from "../assets/1.avif";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/apiSettings";
import { showErrorMessage, showSuccessMessage } from "../utils/toast";
import AuthLayout from "../layouts/auth";
const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    await axios({
      method: "PUT",
      url: `${baseUrl}/api/v1/user/reset-password`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
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
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={inputValues?.password}
          className="w-full p-[15px]  rounded-[50px] border border-black outline-none"
          placeholder="Enter Your Password..."
        />
        <button
          disabled={inputValues.password === "" ? true : false}
          onClick={() => {
            handleSubmit();
          }}
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

export default ResetPasswordPage;
