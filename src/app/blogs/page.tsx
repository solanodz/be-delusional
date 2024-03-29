import React from "react";
import { montserrat } from "@/ui/fonts";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { fetchBlogs } from "../../../actions/actions";
import BlogItem from "@/components/BlogItem";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Search from "@/components/Search";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const Blog = async ({ searchParams }: any) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  // console.log("blogs", searchParams?.query);
  const query = searchParams?.query;

  // home blogs listing page

  const blogs = await prisma.blog.findMany({
    where: query
      ? {
          OR: [
            { title: { contains: query } },
            { category: { contains: query } },
          ],
        }
      : {}, // fetch all the data blogs
  });

  return (
    <MaxWidthWrapper>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-white`}
      >
        All Articles
      </h2>
      <div className="my-5">
        <Search />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4">
        {blogs?.length > 0 &&
          blogs.map((blog) => {
            return <BlogItem key={blog.id} blog={blog} />;
          })}
      </div>
    </MaxWidthWrapper>
  );
};

export default Blog;
