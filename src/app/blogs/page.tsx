import React from "react";
import { montserrat } from "@/ui/fonts";

const page = () => {
  return (
    <div>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        Blog
      </h2>

      <div className="h-screen">...</div>
      <div className="h-screen">...</div>
    </div>
  );
};

export default page;
