"use client";

import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { updateBlog } from "../../../actions/actions";

const UpdateBlogForm = ({ blog }: any) => {
  const ref = useRef<HTMLFormElement>(null);
  const { id, title, description, imageUrl, category } = blog || {};

  const handleUpdateBlog = async (formData: React.FormEvent) => {
    await updateBlog(id, formData as unknown as FormData);
    ref?.current?.reset();
  };
  return (
    <div className="bg-zinc-900 border border-zinc-700 text-white max-w-3xl grid mx-auto p-6  rounded-xl gap-2">
      <form ref={ref} action={handleUpdateBlog} className="grid gap-2">
        <div>
          <Label htmlFor="image-url">Upload image URL</Label>
          <Input
            type="text"
            id="imageUrl"
            name="imageUrl"
            defaultValue={imageUrl ? imageUrl : ""}
          />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            defaultValue={title ? title : ""}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={description ? description : ""}
            rows={10}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            name="category"
            defaultValue={category ? category : ""}
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdateBlogForm;
