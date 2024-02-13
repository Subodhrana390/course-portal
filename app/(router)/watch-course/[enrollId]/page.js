"use client";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useEffect, useState } from "react";
import CourseVideoDescription from "../../course-preview/[courseId]/_components/CourseVideoDescription";
import CourseContentSection from "../../course-preview/[courseId]/_components/CourseContentSection";
import { toast } from "sonner";

function WatchCourse({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState([]);
  const [completedChapter, setCompletedChapter] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    params && user && getUserEnrolledCourseDetails();
  }, [params && user]);

  const getUserEnrolledCourseDetails = () => {
    GlobalAPI.getUserEnrolledCourseDetails(
      params.enrollId,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      setCompletedChapter(resp.userEnrollCourses[0].completedChapter);
      setCourseInfo(resp.userEnrollCourses[0].courseList);
    });
  };

  const onChapterComplete = (chapterId) => {
    GlobalAPI.markChapterCompleted(params.enrollId, chapterId).then((resp) => {
      console.log(resp);
      if (resp) {
        toast("Chapter Mark as Completed");
        getUserEnrolledCourseDetails();
      }
    });
  };
  return (
    courseInfo.name && (
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
        {/* Title Video Description  */}
        <div className="col-span-2 bg-white p-3">
          <CourseVideoDescription
            courseInfo={courseInfo}
            watchMode={true}
            activeChapterIndex={activeChapterIndex}
            setChapterCompleted={(chapterId) => onChapterComplete(chapterId)}
          />
        </div>

        {/* Course Content */}
        <div>
          <CourseContentSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={true}
            watchMode={true}
            completedChapter={completedChapter}
            setActiveChapterIndex={(index) => setActiveChapterIndex(index)}
          />
        </div>
      </div>
    )
  );
}

export default WatchCourse;
