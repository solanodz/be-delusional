"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { addCommentToBlog } from "../../../actions/actions";

const CommentAddForm = ({ blogId }: { blogId: any }) => {
  const ref = useRef<HTMLFormElement | null>(null);

  const addCommentHandler = async (formData: any) => {
    await addCommentToBlog(blogId, formData);
    ref?.current?.reset();
  };

  return (
    <div className="max-w-md mb-6">
      <form
        ref={ref}
        action={addCommentHandler} // Usa onSubmit en lugar de action
        className="grid items-center text-center mx-auto gap-2"
      >
        <Textarea
          id="text"
          name="text"
          placeholder="Write your comment..."
          rows={3}
          required
        />
        <Button type="submit">Add Comment</Button>
      </form>
    </div>
  );
};

export default CommentAddForm;
