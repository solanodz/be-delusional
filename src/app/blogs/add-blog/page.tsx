import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AddBlogForm from "@/components/forms/AddBlogForm";
import { montserrat } from "@/ui/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  // show this page only if user has permissions
  const checkPermissions = session?.user?.permissions?.includes("CREATOR");

  const admin = session?.user?.role === "ADMIN";

  if (!checkPermissions && !admin) {
    console.log("no permissions ⛔");
    redirect("/");
  }
  return (
    <MaxWidthWrapper>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-white`}
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
