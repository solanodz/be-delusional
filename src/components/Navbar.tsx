import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-transparent bg-opacity-50 border-b border-gray-300 sticky top-0 right-0 left-0 mb-20 backdrop-blur-lg z-50">
      <MaxWidthWrapper>
        <nav className=" p-4 flex justify-center gap-6 font-semibold text-zinc-800">
          <Link className=" hover:scale-110 duration-200" href="/blogs">
            Blogs
          </Link>
          <Link className=" hover:scale-110 duration-200" href="/">
            Home
          </Link>
          <Link
            className=" hover:scale-110 duration-200"
            href="/blogs/add-blog"
          >
            Create
          </Link>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
