import React from "react";
import { montserrat } from "@/ui/fonts";

const NotFound = () => {
  return (
    <div>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        404 Not Found
      </h2>
    </div>
  );
};

export default NotFound;
