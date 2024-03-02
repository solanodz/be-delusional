import Image from "next/image";
import { montserrat } from "@/ui/fonts";
import { TextGenerateEffect } from "@/ui/text-generate-effect";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { PiBrainFill } from "react-icons/pi";

export default function Home() {
  return (
    <MaxWidthWrapper className="max-w-4xl text-center flex gap-3 flex-col  w-fit">
      <div
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-8xl text-black`}
      >
        <PiBrainFill className="drop-shadow-lg" />
      </div>
      <div>
        <TextGenerateEffect
          className={`${montserrat.className} font-bold text-3xl tracking-tight sm:text-6xl`}
          words="Every big dream seems like a delusion until it becomes real."
        />
        <p className="text-zinc-500 drop-shadow-md italic leading-none">
          A blog page created for delusional people pursuing their dreams.
        </p>
      </div>
      <div className="flex flex-row gap-3 justify-center my-3">
        <Button variant="outline">Start reading</Button>
        <Button>Start writing</Button>
      </div>
      <div className="h-screen">...</div>
      <div className="h-screen">...</div>
    </MaxWidthWrapper>
  );
}
