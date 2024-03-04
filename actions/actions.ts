"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export const fetchBlogs = async () => {
    const blogs = await prisma.blog.findMany({});
    return blogs
}

export const fetchSingleBlog = async (id: string) => {
    const blogs = await prisma.blog.findFirst({
        where: {
            id: id
        }
    });
    return blogs
}

export const addBlog = async (formData: any) => {
    // collect info from form using formData
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');

    // Check if title is present
    if (!title) {
        throw new Error("Title is required");
    }

    // push the data into the DB
    const new_blog = await prisma.blog.create({
        data: {
            imageUrl: imageUrl ? imageUrl : null,
            title: title,
            category: category,
            description: description
        }
    })

    revalidatePath('/blogs/add-blog')
    redirect('/blogs');
}

export const updateBlog = async (id: string, formData: any) => {

    // collect info from form using formData
    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');


    // push the data into the DB
    const updated_blog = await prisma.blog.update({
        where: {
            id: id,
        },
        data: {
            imageUrl: imageUrl ? imageUrl : null,
            title,
            category,
            description
        }
    })

    revalidatePath(`/blogs/update-blog/${id}`)
    redirect('/blogs')
}
