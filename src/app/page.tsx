import Image from "next/image";
import { montserrat } from "@/ui/fonts";
import { TextGenerateEffect } from "@/ui/text-generate-effect";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { PiBrainFill } from "react-icons/pi";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="max-w-5xl text-center flex gap-3 flex-col  w-fit">
      <div
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-8xl`}
      >
        <PiBrainFill className="drop-shadow-lg" />
      </div>
      <div>
        <TextGenerateEffect
          className={`${montserrat.className} text-zinc-700 font-bold text-4xl tracking-tight sm:text-6xl`}
          words="Every big dream seems like a delusion until it becomes a reality."
        />
        <p className="text-zinc-500 text-sm sm:text-md drop-shadow-md italic leading-none">
          A blog page created for delusional people pursuing their dreams.
        </p>
      </div>
      <div className="flex flex-row gap-3 justify-center my-3">
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
      </div>
    </MaxWidthWrapper>
  );
}
