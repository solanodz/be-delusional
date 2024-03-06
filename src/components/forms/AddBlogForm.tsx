"use client";

import { useRef } from "react";
import { addBlog } from "../../../actions/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const AddBlogForm = () => {
  const ref = useRef<HTMLFormElement>(null);

  const addBlogHandler = async (formData: React.FormEvent) => {
    await addBlog(formData as unknown as FormData);
    ref?.current?.reset();
  };

  return (
    <div className="drop-shadow-md max-w-2xl grid mx-auto p-6 bg-white border border-gray-300 rounded-xl gap-2">
      <form ref={ref} action={addBlogHandler} className="grid gap-2">
        <div>
          <Label htmlFor="image-url">Upload image URL</Label>
          <Input type="text" id="imageUrl" name="imageUrl" />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" name="title" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={10} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input type="text" id="category" name="category" />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default AddBlogForm;
