import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UpdateBlogForm from "@/components/forms/UpdateBlogForm";
import { montserrat } from "@/ui/fonts";
import React from "react";
import { fetchSingleBlog } from "../../../../../actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { log } from "console";

interface UpdateBlogPageProps {
  params: {
    id: string;
  };
}

const UpdateBlogPage = async ({ params }: UpdateBlogPageProps) => {
  const { id } = params;
  const session = await getServerSession(authOptions);

  // show this page only if user has permissions
  const checkPermissions = session?.user?.permissions?.includes("EDITOR");

  const admin = session?.user?.role === "ADMIN";

  if (!checkPermissions && !admin) {
    console.log("no permissions ⛔");
    redirect("/");
  }
  // get the db info for each blog to fill the forms
  const blogData = await fetchSingleBlog(id);

  return (
    <MaxWidthWrapper>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-6 text-white `}
      >
        Update blog
      </h2>
      <div>
        <UpdateBlogForm blog={blogData} />
      </div>
    </MaxWidthWrapper>
  );
};

export default UpdateBlogPage;
