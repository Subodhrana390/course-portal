"use client";
import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";

function layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      <div className="md:w-64 md:block fixed">
        <SideNav toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
      </div>
      <div className="${} md:ml-64">
        <Header toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
        {children}
      </div>
    </div>
  );
}

export default layout;
