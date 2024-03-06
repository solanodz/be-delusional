"use client";

import { formatDate } from "../lib/utils";
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "./ui/button";
import { deleteComment } from "../../actions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CommentItem = ({ comment }: any) => {
  const { id, text, author, createdAt, blogId } = comment || {};

  const deleteCommentHandler = async (formData: any) => {
    const commentId = formData.get("id");

    await deleteComment(commentId, blogId);
  };

  return (
    <div className="bg-zinc-200 px-2 py-1 my-2 w-fit min-w-52 max-w-sm text-sm rounded-lg mr-4">
      <h4 className="font-semibold">{author}</h4>
      <p>{text}</p>
      <div className="items-center mt-1 flex flex-row justify-between">
        <p className="text-xs text-muted-foreground text-right font-medium ">
          {formatDate(createdAt)}
        </p>

        <Dialog>
          <DialogTrigger>
            <FaTrashCan className="h-6 cursor-pointer hover:text-red-600 duration-200" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this comment?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this
                comment:
              </DialogDescription>
              <DialogDescription className="text-black py-2 font-medium items-center justify-center flex text-left">
                <div className="bg-zinc-200 px-2 py-1 my-2 w-fit min-w-52 max-w-sm text-sm rounded-lg mr-4">
                  <h4 className="font-semibold">{author}</h4>
                  <p>{text}</p>
                  <div className="items-center mt-1 flex flex-row justify-between">
                    <p className="text-xs text-muted-foreground text-right font-medium ">
                      {formatDate(createdAt)}
                    </p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <form action={deleteCommentHandler}>
              <input type="hidden" name="id" value={id} />
              <Button
                variant={"destructive"}
                className="ml-auto flex gap-2"
                size={"sm"}
              >
                <FaTrashCan className="" />
                <p>Delete</p>
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CommentItem;
