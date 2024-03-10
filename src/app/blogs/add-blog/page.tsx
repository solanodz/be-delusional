import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddBlogForm from "@/components/forms/AddBlogForm";
import { montserrat } from "@/ui/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <MaxWidthWrapper>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        Add blog
      </h2>
      <div>
        <AddBlogForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
