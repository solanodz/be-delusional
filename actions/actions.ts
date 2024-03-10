"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const fetchBlogs = async () => {
  const blogs = await prisma.blog.findMany({});
  return blogs;
};

export const fetchSingleBlog = async (id: string) => {
  const blogs = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });
  return blogs;
};

export const addBlog = async (formData: any) => {
  // collect info from form using formData
  const imageUrl = formData.get("imageUrl");
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");

  // Check if title is present
  if (!title) {
    throw new Error("Title is required");
  }

  // session to get the current logged in user info
  const session = await getServerSession(authOptions);

  // push the data into the DB
  const new_blog = await prisma.blog.create({
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
      authorId: session?.user?.id,
    },
  });

  revalidatePath("/blogs/add-blog");
  redirect("/blogs");
};

export const updateBlog = async (id: string, formData: any) => {
  const session = await getServerSession(authOptions);

  // collect info from form using formData
  const imageUrl = formData.get("imageUrl");
  const title = formData.get("title");
  const category = formData.get("category");
  const description = formData.get("description");

  // push the data into the DB
  const updated_blog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
      authorId: session?.user?.name ?? session?.user?.id,
    },
  });

  revalidatePath(`/blogs/update-blog/${id}`);
  redirect("/blogs");
};

// delete blog
export const deleteBlog = async (id: string) => {
  await prisma.blog.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/blogs");
  redirect("/blogs");
};

// add Comment to a blog
export const addCommentToBlog = async (blogId: any, formData: any) => {
  const session = await getServerSession(authOptions);

  // collect info from form using formData
  const text = formData.get("text");
  // push the data into the DB
  const added_comment = await prisma.comment.create({
    data: {
      authorId: session?.user?.id,
      blogId: blogId,
      text: text,
    },
  });
  revalidatePath(`/blogs/${blogId}`);
  redirect(`/blogs/${blogId}`);
};

export const fetchComments = async (blogId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};

export const deleteComment = async (commentId: any, blogId: any) => {
  // only the author of the comment can delete it
  const session = await getServerSession(authOptions);

  // finding commment of authorId
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (session?.user?.id === commentData?.authorId) {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(`/blogs/${blogId}`);
  } else {
    throw new Error("You are not authorized to delete this comment");
  }
};
