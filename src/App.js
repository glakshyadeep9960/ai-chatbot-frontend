import { ToastContainer } from "react-toastify";
import "./App.css";
import HomePage from "./pages/AIChatBot";
import LoginPage from "./pages/loginPage";
import PrivateRoutes from "./utils/privateRoutes";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import RegisterPage from "./pages/registerPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./utils/apiSettings";
import ForgotPasswordPage from "./pages/forgotPasswordPage";
import VerifyAccountPage from "./pages/verifyAccountPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import PricingPage from "./pages/pricingPage";
import SuccessPage from "./paymentInfoPages/successPage";
import SiteHeader from "./components/header";
import PageNotFound from "./pages/pageNotFound";
import Home from "./pages/home";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const [userDetails, setUserDetails] = useState(null);
  console.log(urlParams, "lacas");
  const navigate = useNavigate();
  if (token) {
    localStorage.setItem("userToken", token);

    window.location.href = "/user/";
  }
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");
  const handleFetchUser = async () => {
    await axios({
      method: "GET",
      url: `${baseUrl}/api/v1/user/get-user`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        setUserDetails(res?.data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status) {
          navigate("/auth/user/login");
        }
        localStorage.getItem("userToken");
        if (location.pathname === "/user/") {
          navigate("/auth/user/login");
        }
      });
  };
  useEffect(() => {
    handleFetchUser();
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Navigate to={"/home"} />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/auth/user">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verify-account/:token" element={<VerifyAccountPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/user" element={<Navigate to={"/user/ai-chatbot"} />} />
        <Route path="/user">
          <Route
            path="ai-chatbot"
            element={
              <PrivateRoutes>
                <HomePage user={userDetails} />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="pricing"
            element={
              <PrivateRoutes>
                <PricingPage user={userDetails} />
              </PrivateRoutes>
            }
          />
          <Route
            path="payment-success"
            element={
              <PrivateRoutes>
                <SuccessPage />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
