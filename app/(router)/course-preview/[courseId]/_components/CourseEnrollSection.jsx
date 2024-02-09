import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CourseEnrollSection({ courseInfo, isUserAlreadyEnrolled }) {
  const membership = false;
  const { user } = useUser();
  const router = useRouter();

  const onEnrollCourse = () => {
    GlobalAPI.enrollToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress?.emailAddress
    ).then((resp) => {
      if (resp) {
        toast("User Enrolled Successfully", {
          description: "User Enrolled to this course",
        });
        router.push("/watch-course/" + resp.createUserEnrollCourse.id);
      }
    });
  };

  return (
    <div className="p-3 text-center rounded-sm bg-primary flex flex-col gap-3">
      <h2 className="text-[22px] font-bold text-white">Enroll to the Course</h2>
      {/* User has Membership and Already Login  */}
      {user && (membership || courseInfo.free) && !isUserAlreadyEnrolled ? (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Enroll Now to Start Learning and Building the project
          </h2>
          <Button
            className="bg-white text-primary hover:bg-white hover:text-primary"
            onClick={() => {
              onEnrollCourse();
            }}
          >
            Enroll Now
          </Button>
        </div>
      ) : !user ? (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Enroll Now to Start Learning and Building the project
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">
              Enroll Now
            </Button>
          </Link>
        </div>
      ) : (
        !isUserAlreadyEnrolled && (
          <div className="flex flex-col gap-3 mt-3">
            <h2 className="text-white font-light">
              Buy Monthly Membership and get Access to all Courses
            </h2>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">
              Buy Membership Just $2.99
            </Button>
          </div>
        )
      )}

      {/* User Does not Have Membership or Not Signup/Login */}
      {isUserAlreadyEnrolled && (
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Continue to learn your project
          </h2>
          <Link href={"/watch-course/" + isUserAlreadyEnrolled}>
            <Button className="bg-white text-primary hover:bg-white hover:text-primary">
              Cotinue
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollSection;
