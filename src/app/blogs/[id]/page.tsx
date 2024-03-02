import { notFound } from "next/navigation";
import React from "react";
import { montserrat } from "@/ui/fonts";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetail = ({ params }: BlogDetailProps) => {
  const id = params?.id;

  if (id === "4") {
    notFound();
  }

  return (
    <div>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        Blog detail id: {id}
      </h2>
    </div>
  );
};

export default BlogDetail;
