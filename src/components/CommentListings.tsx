import React from "react";
import { fetchComments } from "../../actions/actions";
import CommentItem from "./CommentItem";
import { Badge } from "./ui/badge";

const CommentListings = async ({ blogId }: any) => {
  const comments = await fetchComments(blogId);
  console.log(comments);

  return (
    <div className="">
      <div className="flex flex-row  my-4">
        <h3 className="text-xl font-semibold ">Comments ({comments.length})</h3>
      </div>
      <div>
        {comments?.length > 0 ? (
          comments.map((comment: any) => {
            return <CommentItem key={comment.id} comment={comment} />;
          })
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentListings;
