"use server"

import prisma from "@/lib/prisma"
import { addPostZodSchema, AddPostZodSchemaType } from "@/schema/post"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const addPost = async (data: AddPostZodSchemaType) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated")
  const result = addPostZodSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: 'Invalid form data'
    }
  }

  try {
    await prisma.post.create({
      data: {
        ...data,
        userId
      }
    })
    revalidatePath('/');
  } catch (error) {
    console.log("🚀 ~ addPost ~ error:", error)
    return {
      success: false,
      error: 'Failed to create post'
    }
  }
}
