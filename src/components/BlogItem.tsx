import React from "react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface BlogItemProps {
  blog: any; // Replace 'any' with the actual type of the 'blog' object
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  const { id, title, imageUrl, description, category } = blog || {};
  return (
    <Link
      href={`/blogs/${id}`}
      className="bg-zinc-900 p-3 drop-shadow-md border border-zinc-700 text-white rounded-xl"
    >
      <div>
        <img
          src={imageUrl}
          className="w-full h-[200px] object-cover mb-4 rounded-md"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </h2>
        <Badge>{category}</Badge>
      </div>
    </Link>
  );
};

export default BlogItem;
