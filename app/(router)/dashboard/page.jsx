"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import WelcomeBannerDashboard from "./_components/WelcomeBannerDashboard";
import SideBanners from "../courses/_components/SideBanners";
import InProgressCourseList from "./_components/InProgressCourseList";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useEffect } from "react";

function Dashboard() {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  useEffect(() => {
    user && getUserAllEnrolledCourseList();
  }, [user]);

  const getUserAllEnrolledCourseList = () => {
    GlobalAPI.getUserAllEnrolledCourseList(
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);
      setUserEnrolledCourses(resp.userEnrollCourses);
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5">
      {/* Left Container  */}
      <div className="col-span-3">
        {/* Banner  */}
        <WelcomeBannerDashboard user={user} />

        {/* In progress CourseList */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      {/* Rigth Container  */}
      <div className="p-5 bg-white rounded-xl">
        <SideBanners />
      </div>
    </div>
  );
}

export default Dashboard;
