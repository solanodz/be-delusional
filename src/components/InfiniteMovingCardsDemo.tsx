"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative ">
      <InfiniteMovingCards items={images} direction="right" speed="slow" />
    </div>
  );
}

const images = [
  {
    quote:
      "If you have a creative mind you're gonna doubt a lot of things about yourself, about the world. Insecurities are completely normal specially with your own work becouse is an extension of yourself. When you are giving away some of your arte, you are giving away a piece of yourself, and it's like satnd in front a bunch of people naked. You got to be cool and let people get to know you in a deeper level. Then it all happens.",
    name: "Mac Miller",
    title: "Tino Cochino Radio",
  },
  {
    quote: `"I'm waiting for everything to be perfect before I live my life. As soon as this things line up, I'm gonna live my life". I'm never gonna get to that, when everything is okay, where everything looks at certain way, and in the mean time I'm burning the best time I do have available. As soon as this candle is brigther o warm enough, I'm gonna live my life, but the carndle is getting smaller.`,
    name: "Theo Von",
    title: "This past weekend",
  },
];
