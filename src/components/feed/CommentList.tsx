"use client"

import { addComment } from '@/actions';
import { useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from 'next/image';
import { useOptimistic, useState } from "react";
import { IoIosMore } from 'react-icons/io';
import { useToast } from '../Toast';


type CommentWithUser = Comment & { user: User }

const CommentList = ({
  comments,
  postId
}: {
  comments: CommentWithUser[],
  postId: number
}) => {
  const { showToast } = useToast()
  const { user } = useUser()
  const [desc, setDesc] = useState("")
  const [commentsState, setCommentsState] = useState(comments)
  const [optimisticComments, addOptimisticComments] = useOptimistic(commentsState, (state, value: CommentWithUser) => [value, ...state])

  const add = async () => {
    if (!user || !desc) return
    addOptimisticComments({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    })
    try {
      const res = await addComment({
        postId,
        desc
      });
      if (res.success) {
        setCommentsState((prev) => [res.data as CommentWithUser, ...prev])
        setDesc("")
        showToast("Comment added")
      }
    } catch (error) {
      showToast("Something went wrong")
    }
  }

  return (
    <div className=''>
      {user && (
        <div className="flex items-center gap-4">
          <Image src={user.imageUrl || "/noAvatar.png"} alt="" width={32} height={32} className='w-8 h-8 rounded-full' />
          <form
            action={add}
            className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder='Write a comment...'
              className='bg-transparent outline-none w-full'
            />
            <Image src="/emoji.png" alt="" width={16} height={16} className='w-4 h-4 cursor-pointer' />
          </form>
        </div>
      )}
      {optimisticComments.map(comment => (
        <div key={comment.id} className="flex gap-4 justify-between mt-6">
          <Image src={comment.user.avatar || '/noAvatar.png'} alt="" width={40} height={40} className='w-10 h-10 rounded-full' />
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">
              {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username
              }
            </span>
            <p>{comment.desc}</p>
            <div className="flex items-center gap-8 text-xs to-gray-500">
              <div className="flex items-center gap-4">
                <Image src="/like.png" alt="" width={16} height={16} className='cursor-pointer' />
                <span className='text-gray-300'>|</span>
                <span className="text-gray-500">
                  0 <span className='hidden md:inline'> Likes</span>
                </span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          <IoIosMore width={16} height={16} className='cursor-pointer' />
        </div>
      ))}
    </div >
  )
}

export default CommentList