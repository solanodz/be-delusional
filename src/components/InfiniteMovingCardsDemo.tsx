"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { montserrat } from "@/ui/fonts";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative ">
      <InfiniteMovingCards items={images} direction="right" speed="slow" />
    </div>
  );
}

const images = [
  {
    quote:
      "Insecurities are completely normal specially with your own work because is an extension of yourself. When you are giving away some of your art, you are giving away a piece of yourself, and it's like stand in front a bunch of people naked. You got to be cool and let people get to know you in a deeper level. Then it all happens.",
    name: "Mac Miller",
    title: "Tino Cochino Radio",
  },
  {
    quote: `I'm waiting for everything to be perfect before I live my life. I'm never gonna get to that, when everything is okay, where everything looks at certain way, and in the mean time I'm burning the best time I do have available. As soon as this candle is brigther o warm enough, I'm gonna live my life, but the carndle is getting smaller.`,
    name: "Theo Von",
    title: "This past weekend",
  },
  {
    quote: `God tests you. He wants to see how much you can take before you say "Let's just finish with this". He wants to show you something, how much you can take, how much you can handle. You say you love life? God's gonna show you life. Life is beautiful but you got to accept the good and the bad as being beautiful.`,
    name: "Mike Tyson",
    title: "Hotboxin' with Mike Tyson",
  },
];
