"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const CommentAddForm = () => {
  return (
    <div className="max-w-md my-6">
      <form className="grid items-center text-center mx-auto gap-2">
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
