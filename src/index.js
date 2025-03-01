import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId = process.env.REACT_APP_GOOGLE_CLIENT;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Elements stripe={stripePromise}>
        <Router>
          <App />
        </Router>
      </Elements>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
