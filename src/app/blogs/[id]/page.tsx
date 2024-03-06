import React from "react";
import { montserrat } from "@/ui/fonts";
import {
  deleteBlog,
  deleteComment,
  fetchComments,
  fetchSingleBlog,
} from "../../../../actions/actions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FaA, FaArrowLeftLong, FaPencil, FaTrashCan } from "react-icons/fa6";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import CommentAddForm from "@/components/forms/CommentAddForm";
import CommentListings from "@/components/CommentListings";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <MaxWidthWrapper className="py-6">
      <Link
        href="/blogs"
        className={`${
          (montserrat.className, buttonVariants({ variant: "link" }))
        } flex font-semibold gap-3`}
      >
        <FaArrowLeftLong className="text-lg" />

        <p>Back to blogs</p>
      </Link>
      <div className="flex flex-col sm:flex-row gap-4">
        <section className="bg-white p-4 border border-gray-300 rounded-lg">
          <div className="">
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
                className="w-full h-72 sm:h-[500px] md:h-[450px] object-cover mb-4 rounded-md"
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
            <Button
              className={`${buttonVariants({ variant: "destructive" })} gap-2`}
            >
              <FaTrashCan />
              <p>delete</p>
            </Button>
          </div>
        </section>
        <aside className="bg-white  p-4 border border-gray-300 rounded-lg min-w-[320px] flex flex-col no-wrap">
          <div className="">
            <CommentAddForm blogId={id} />
          </div>
          <div>
            <ScrollArea className="h-[550px]">
              <CommentListings blogId={id} />
            </ScrollArea>
          </div>
        </aside>
      </div>
    </MaxWidthWrapper>
  );
};

export default BlogDetail;
