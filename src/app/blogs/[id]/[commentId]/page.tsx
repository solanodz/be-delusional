import React from "react";
import { montserrat } from "@/ui/fonts";

interface CommentDetailProps {
  params: {
    id: any;
  };
}

const CommentDetail = ({ params }: CommentDetailProps) => {
  return (
    <div>
      <h2
        className={`${montserrat.className} font-bold text-4xl text-center flex justify-center sm:text-5xl tracking-tighter my-12 text-black`}
      >
        Comment Detail
      </h2>
    </div>
  );
};

export default CommentDetail;
