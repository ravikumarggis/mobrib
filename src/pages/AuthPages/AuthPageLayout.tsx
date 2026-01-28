import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link, Navigate } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { isLoggedIn } from "../../queries/common";
import { useProfile } from "../../queries/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isLoggedIn()) {
    return <Navigate to={"/user-list"} />;
  }
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/user-list" className="block mb-4">
                <img
                  width={300}
                  height={80}
                  src="images/logo/nowory-siginlogo.png"
                  alt="Logo"
                />
              </Link>
              {/* <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p> */}
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
