import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Navigate, Outlet, redirect } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { isLoggedIn } from "../queries/common";
import { useState } from "react";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [searchModule, setSearchModule] = useState("");

  if (!isLoggedIn()) {
    localStorage.removeItem("otp-countdown");
    return <Navigate to={"/"} />;
  }

  return (
    // <div className="min-h-screen xl:flex">
    <div className="w-full">
      <div>
        <AppSidebar searchModule={searchModule} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader
          searchModule={searchModule}
          setSearchModule={setSearchModule}
        />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
