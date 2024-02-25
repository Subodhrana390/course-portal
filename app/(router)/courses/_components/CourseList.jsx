import React, { useEffect, useState } from "react";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseItem from "./CourseItem";
import Link from "next/link";


const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    getAllCourses();
  }, [selectedFilter]);

  const getAllCourses = () => {
    GlobalAPI.getAllCourseList().then((resp) => {
      selectedFilter == "all"
        ? setCourseList(resp?.courseLists)
        : selectedFilter == "paid"
        ? setCourseList(resp?.courseLists.filter((item) => item.free == false))
        : setCourseList(resp?.courseLists.filter((item) => item.free == true));
    });
  };

 
  return (
    <div className="p-5 bg-white rounded-lg mt-3">
      <div className="flex items-center justify-between">
        <div className="text-[20px] font-bold text-primary">All Courses</div>
        <Select
          onValueChange={(value) => {
            setSelectedFilter(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courseList?.length > 0
          ? courseList.map((item, index) => (
              <Link href={`/course-preview/` + item.slug}>
                <div key={item.slug}>
                  <CourseItem course={item} />
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <div className="w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse"></div>
            ))}
      </div>
    </div>
  );
};

export default CourseList;
