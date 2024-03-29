"use client";
import {
  BadgeIcon,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  MailIcon,
  X,
} from "lucide-react";
import Logo from "../../../public/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function SideNav({ isSideNavOpen, toggleSideNav, setIsSideNavOpen }) {
  const { user } = useUser();
  const menu = [
    {
      id: 8,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All Courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },
    {
      id: 2,
      name: "Be instructor",
      icon: GraduationCap,
      path: "/instructor",
      auth: true,
    },
    {
      id: 3,
      name: "Membership",
      icon: BadgeIcon,
      path: "/codingIndia-pro",
      auth: true,
    },
    { id: 4, name: "Store", icon: LayoutGrid, path: "/store", auth: true },
    {
      id: 5,
      name: "NewsLetter",
      icon: MailIcon,
      path: "/newsLetter",
      auth: true,
    },
  ];

  const path = usePathname();
  return (
    <div
      className={` ${
        isSideNavOpen ? "block" : "hidden"
      } md:block p-5 bg-white shadow-sm border transition-display duration-500 ease-linear h-screen `}
    >
      <div className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="logo"
          width={170}
          height={80}
          className="h-20 w-20 block"
        />
        <h1 className="text-[24px] font-bold text-primary">Coding India</h1>

        <X className="md:hidden" onClick={toggleSideNav} />
      </div>
      <hr className="mt-7" />
      {/* Menulist */}
      <div className="mt-5">
        {menu.map(
          (item, index) =>
            item.auth && (
              <Link href={item.path} key={index}>
                <div
                  key={index}
                  className={`group flex gap-3 mt-1 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-200
              ${path.includes(item.path) && "bg-primary text-white"}`}
                  onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                >
                  <item.icon className="group-hover:animate-bounce" />
                  {item.name}
                </div>
              </Link>
            )
        )}
      </div>
      <Link href={"/sign-in"}>
        <Button className="block md:hidden">Get Started</Button>
      </Link>
    </div>
  );
}

export default SideNav;
