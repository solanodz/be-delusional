"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-white bg-opacity-75 border-b border-gray-200 sticky top-0 right-0 left-0 mb backdrop-blur-xl z-50">
      <MaxWidthWrapper>
        <nav className=" min-h-16 flex justify-between gap-6 font-medium text-zinc-800  items-center">
          <div>
            <h2>LOGO</h2>
          </div>

          <div className="flex gap-6 items-center">
            <Link className=" hover:scale-110 duration-200" href="/blogs">
              Blogs
            </Link>
            <Link className=" hover:scale-110 duration-200" href="/">
              Home
            </Link>
            {/* <Link
            className=" hover:scale-110 duration-200"
            href="/blogs/add-blog"
          >
            Create
          </Link> */}

            {session?.data?.user?.role === "ADMIN" && (
              <Link
                className=" hover:scale-110 duration-200"
                href="/blogs/add-blog"
              >
                Create
              </Link>
            )}
            {session?.data?.user && (
              <Button
                onClick={() => {
                  signOut();
                  redirect("/auth/login");
                }}
              >
                Sign out
              </Button>
            )}
          </div>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
