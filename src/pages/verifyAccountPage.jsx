import React, { useEffect, useState } from "react";
import AiLoadingGif from "../assets/ai-loading.gif";
import axios from "axios";
import { baseUrl } from "../utils/apiSettings";
import { useNavigate, useParams } from "react-router-dom";
const VerifyAccountPage = () => {
  const [text, setText] = useState("Welcome to Verification Page");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const handleFetchData = async () => {
    setIsFetchingData(true);
    await axios({
      method: "PUT",
      url: `${baseUrl}/api/v1/user/verify-account`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setIsFetchingData(false);
        setText("Verified Successfully");
        if (res.data.message === "User already Verified") {
          setTimeout(() => {
            navigate(`/auth/user/reset-password/${token}`);
          }, 3000);
        } else if (res.data.message === "User Verified Successfully") {
          setTimeout(() => {
            navigate("/auth/user/login");
          }, 3000);
        }
      })
      .catch((err) => {
        setIsFetchingData(false);
        setText("Verification Failed");
      });
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-[12px] p-[20px]">
      <h1 className="text-[32px] font-semibold">{text}</h1>
      <img
        src={AiLoadingGif}
        alt="img"
        className="w-[100px] h-[100px] object-cover  rounded-[100px]"
      />
      <p>Wait a minute!, We're processing the data...</p>
    </div>
  );
};

export default VerifyAccountPage;
