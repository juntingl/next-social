"use server"

import prisma from "@/lib/prisma"
import { addCommentZodSchema, AddCommentZodSchemaType } from "@/schema/comment"
import { addPostZodSchema, AddPostZodSchemaType } from "@/schema/post"
import { switchFollowZodSchema, updateProfileZodSchema, UpdateProfileZodSchemaType } from "@/schema/user"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const addPost = async (data: AddPostZodSchemaType) => {
  const { userId } = await auth();
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

export const deletePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated")

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId
      }
    })
    revalidatePath('/');
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete post'
    }
  }
}

export const switchLike = async (postId: number) => {
  const { userId } = await auth();
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

export const addComment = async (data: AddCommentZodSchemaType) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated")
  const result = addCommentZodSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: 'Invalid form data'
    }
  }

  try {
    const createComment = await prisma.comment.create({
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

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated")
  const result = switchFollowZodSchema.safeParse({ userId });

  if (!result.success) {
    return {
      success: false,
      error: 'Invalid form data，The userId field type is not a string.'
    }
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      }
    });

    if (existingFollow) {
      // Unfollow
      const res = await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        }
      })
      if (res) {
        return {
          success: true,
          data: res,
        }
      } else {
        return {
          success: false,
          error: 'Failed to unfollow'
        }
      }
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        }
      })

      if (existingFollowRequest) {
        // Cancel follow request
        const res = await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          }
        })
        if (res) {
          return {
            success: true,
            data: res,
          }
        } else {
          return {
            success: false,
            error: 'Failed to cancel follow request'
          }
        }
      } else {
        // Send follow request
        const res = await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          }
        })
        if (res) {
          return {
            success: true,
            data: res,
          }
        } else {
          return {
            success: false,
            error: 'Failed to send follow request'
          }
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to switch follow'
    }
  }
}

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) throw new Error("User is not authenticated")

    try {
      const existingBlock = await prisma.block.findFirst({
        where: {
          blockerId: currentUserId,
          blockedId: userId
        }
      });
      if (existingBlock) {
        // Unblock
        const res = await prisma.block.delete({
          where: {
            id: existingBlock.id,
          }
        })
        if (res) {
          return {
            success: true,
            data: res,
          }
        } else {
          return {
            success: false,
            error: 'Failed to unblock'
          }
        }
      } else {
        // Block
        const res = await prisma.block.create({
          data: {
            blockerId: currentUserId,
            blockedId: userId,
          }
        })
        if (res) {
          return {
            success: true,
            data: res,
          }
        } else {
          return {
            success: false,
            error: 'Failed to block'
          }
        }
      }
    } catch (error) {
      throw new Error("Failed to switch block");
    }
}

export const uploadProfile = async (
  prevState: { success: boolean; msg: string; },
  payload: { data: UpdateProfileZodSchemaType; }
) => {
  const { data } = payload;
  const validatedResult = updateProfileZodSchema.safeParse(data);
  if (!validatedResult.success) {
    console.log("Field errors: ", validatedResult.error.flatten().fieldErrors)
    return {
      success: false,
      msg: 'Invalid form data',
    }
  }

  const { userId } = await auth()
  if (!userId) {
    return {
      success: false,
      msg: 'User is not authenticated',
    }
  }

  try {
    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedResult.data
    })

    if (res) {
      return {
        success: true,
        msg: 'Profile updated successfully',
      }
    } else {
      return {
        success: false,
        msg: 'Failed to update profile',
      }
    }
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return {
      success: false,
      msg: 'Failed to update profile',
    }
  }

}