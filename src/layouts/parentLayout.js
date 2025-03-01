import React from "react";
import SiteHeader from "../components/header";

const ParentLayout = ({ children }) => {
  return (
    <div className="relative w-full">
      <SiteHeader />
      {children}
    </div>
  );
};

export default ParentLayout;
