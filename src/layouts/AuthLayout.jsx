import React from "react";
import img1 from "../assets/authImage.png"; 
import { Outlet } from "react-router";
import SwiftTrackLogo from "../pages/shared/swiftTrackLogo/SwiftTrackLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#FAFAF3] relative lg:px-24">
      {/* Top-left Logo */}
      <div className="absolute top-6 left-6">
        <SwiftTrackLogo></SwiftTrackLogo>
      </div>

      {/* Left Side - Login/Register Form */}
      <div className="w-full max-w-md p-8 z-10">
        <Outlet />
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex items-center justify-center flex-1 p-8">
        <img
          src={img1}
          alt="Delivery Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
