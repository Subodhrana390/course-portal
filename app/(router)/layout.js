"use client";
import React, { useContext, useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import GlobalAPI from "../_utils/GlobalAPI";
import { UserMemberContext } from "../_context/UserMemberContext";

function layout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const { user } = useUser();
  const { setIsMember } = useContext(UserMemberContext);
  useEffect(() => {
    user && checkUserMembership();
  }, [user]);

  const checkUserMembership = () => {
    GlobalAPI.checkForMembership(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        if (resp?.memberships?.length > 0) {
          setIsMember(true);
        }
      }
    );
  };
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
