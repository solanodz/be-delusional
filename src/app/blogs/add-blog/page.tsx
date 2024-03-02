import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { montserrat } from "@/ui/fonts";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        Add blog
      </h2>
      <div></div>
    </MaxWidthWrapper>
  );
};

export default page;
