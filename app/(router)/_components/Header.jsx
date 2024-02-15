"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { BellDot, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

function Header(props) {
  const { user, isLoaded } = useUser();
  return (
    <div className="pl-12 pr-4 py-4 md:p-4 bg-white flex justify-between">
      {!props.isSideNavOpen ? (
        <Menu
          className="absolute top-5 left-3 z-10 md:hidden"
          onClick={props.toggleSideNav}
        />
      ) : (
        ""
      )}

      {/* Search Bar  */}
      <div className=" flex gap-2 border p-2 rounded-md">
        <Search className="h-5 w-5" />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search"
          className="outline-none"
        />
      </div>
      {/* Get started button & bell icon */}
      <div className="flex items-center gap-4">
        <BellDot className="text-gray-500" />
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/courses" />
        ) : (
          <Link href={"/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
