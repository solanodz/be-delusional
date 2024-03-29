import Image from "next/image";
import { montserrat } from "@/ui/fonts";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { PiBrainFill } from "react-icons/pi";
import Link from "next/link";
import { IoArrowDownSharp, IoWarningOutline } from "react-icons/io5";
import { InfiniteMovingCardsDemo } from "@/components/InfiniteMovingCardsDemo";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <MaxWidthWrapper>
      <div className=" text-left max-w-[1300px] flex gap-3 my-auto justify-center flex-col w-fit">
        <div className="flex flex-col sm:flex-row items-end">
          <TextGenerateEffect
            className={`${montserrat.className} text-white drop-shadow-lg font-bold text-5xl sm:text-9xl `}
            words="EVERY BIG DREAM SEEMS LIKE A DELUSION UNTIL IT BECOMES A REALITY..."
          />

          <div>
            <IoArrowDownSharp className="text-5xl text-red-600 sm:text-7xl text-center mx-auto animate-bounce my-6" />
          </div>
        </div>

        {/* <div className="flex flex-row gap-3 justify-center my-3">
        <Link
          href={"/blogs"}
          className={buttonVariants({ variant: "outline" })}
        >
          Start reading
        </Link>

        <Link
          href={"/blogs/add-blog"}
          className={buttonVariants({ variant: "default" })}
        >
          Start writing
        </Link>
      </div> */}
        <p
          className={`${montserrat.className}  sm:max-w-xl text-white mt-6 text-right font-bold text-xl sm:text-3xl ml-auto`}
        >
          Created just for people seeking inspiration and motivation to pursue
          their dreams, no matter what they may be.
        </p>
      </div>
      <div className="hidden md:flex justify-center p-6 mt-12 bg-opacity-50">
        <InfiniteMovingCardsDemo />
      </div>
    </MaxWidthWrapper>
  );
}
