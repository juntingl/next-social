"use server"

import prisma from "@/lib/prisma"
import { addCommentZodSchema, AddCommentZodSchemaType } from "@/schema/comment"
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

export const switchLike = async (postId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated")

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId
      }
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        }
      })
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        }
      })
    }
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to switch like'
    }
  }
}

export const addComment = async(data: AddCommentZodSchemaType) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated")
  const result = addCommentZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: 'Invalid form data'
    }
  }

  try {
    const createComment =  await prisma.comment.create({
      data: {
        ...data,
        userId
      },
      include: {
        user: true
      }
    })
    return {
      success: true,
      data: createComment
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to add comment'
    }
  }
}