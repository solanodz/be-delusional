import { notFound } from "next/navigation";
import React from "react";
import { montserrat } from "@/ui/fonts";
import { fetchSingleBlog } from "../../../../actions/actions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaA, FaArrowLeftLong, FaPencil, FaTrashCan } from "react-icons/fa6";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import CommentAddForm from "@/components/forms/CommentAddForm";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const id = params?.id;

  const blog = await fetchSingleBlog(id);

  console.log(blog);

  return (
    <MaxWidthWrapper>
      <div className="">
        <Link
          href="/blogs"
          className={`${
            (montserrat.className, buttonVariants({ variant: "link" }))
          } flex items-center font-semibold gap-3`}
        >
          <FaArrowLeftLong className="text-lg" />

          <p>Back to blogs</p>
        </Link>
        <div className="flex flex-col items-center my-1">
          <h2
            className={`${montserrat.className} max-w-3xl text-center my- font-bold text-4xl sm:text-5xl tracking-tighter text-black`}
          >
            {blog?.title}
          </h2>
          <Badge className="my-2 w-fit">{blog?.category}</Badge>
        </div>
        {blog?.imageUrl ? (
          <img
            src={blog?.imageUrl}
            alt={blog?.title}
            width={500}
            height={500}
            className="w-full h-[500px] object-cover mb-4 rounded-md"
          />
        ) : null}
      </div>

      <div className="my-6 bg-white">
        <p className="sm:text-md text-zinc-800 text-sm font-medium">
          {blog?.description}
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href={`/blogs/update-blog/${id}`}
          className={`${buttonVariants({ variant: "default" })} gap-2`}
        >
          <FaPencil />
          <p>edit</p>
        </Link>
        <Link
          href={`/blogs/update-blog/${id}`}
          className={`${buttonVariants({ variant: "destructive" })} gap-2`}
        >
          <FaTrashCan />
          <p>delete</p>
        </Link>
      </div>
      <div>
        <CommentAddForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogDetail;
