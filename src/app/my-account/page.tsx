"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { montserrat } from "@/ui/fonts";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const MyAccount = () => {
  const session = useSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <MaxWidthWrapper>
      <div className="text-white bg-zinc-950 border border-zinc-700 p-6 rounded-xl mt-12">
        <div className="flex flex-col gap-2">
          <h2
            className={`${montserrat.className} font-bold text-4xl sm:text-5xl tracking-tighter text-white`}
          >
            Hey, {session?.data?.user?.username}!
          </h2>
          <p
            className={`${montserrat.className} text-2xl font-semibold text-zinc-400`}
          >
            Your account information
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default MyAccount;
