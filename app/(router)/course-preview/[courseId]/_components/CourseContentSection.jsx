import { Lock, Play } from "lucide-react";
import React, { useState } from "react";

function CourseContentSection({ courseInfo }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="p-3 bg-white rounded-sm mt-3">
      <h2>Contents</h2>
      {courseInfo.chapter.map((item, index) => (
        <div key={index}>
          <h2
            className={`p-2 text-[14px] flex justify-between items-center border rounded-sm m-2 px-4 hover:bg-gray-200 hover:text-gray-500 cursor-pointer ${
              activeIndex == index && "bg-primary text-white"
            }`}
          >
            {index + 1}. {item.name}
            {activeIndex == index ? (
              <Play className="w-4 h-4" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CourseContentSection;
