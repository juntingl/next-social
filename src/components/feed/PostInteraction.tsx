
"use client";

import { switchLike } from '@/actions';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { useOptimistic, useState } from 'react';
import { useToast } from '../Toast';

const PostInteraction = ({
  postId,
  likes,
  commentNumber
}: {
  postId: number,
  likes: string[],
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth()
  const { showToast } = useToast()
  const [likeState, setLikeState] = useState({
    isLiked: userId ? likes.includes(userId) : false,
    likeCount: likes.length
  })

  const [optimisticLike, switchOptimisticLike] = useOptimistic(likeState, (state, value) => {
    return {
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked:!state.isLiked
    }
  })

  const likeAction = async () => {
    if (!isLoaded || !userId) return
    switchOptimisticLike("")
    try {
      const res = await switchLike(postId);
      if (!res.success) {
        showToast(res.error!);
        return
      }
      const newState = res.success ? ({
        isLiked: !likeState.isLiked,
        likeCount: likeState.isLiked ? likeState.likeCount - 1 : likeState.likeCount + 1
      }) : likeState
      setLikeState((state) => newState)
      // setLikeState((state) => ({
      //   ...state,
      //   isLiked: res.success ? !state.isLiked : state.isLiked,
      //   likeCount: res.success ? (state.isLiked ? state.likeCount - 1 : state.likeCount + 1) : state.likeCount
      // }))
    } catch (error) {
      console.log("handleLike", error)
      showToast(error as string);
    }
  }

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
          <form action={likeAction}>
            <button>
              <Image src="/like.png" alt="" width={16} height={16} className='cursor-pointer' />
            </button>
          </form>
          <span className='text-gray-300'>|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}<span className='hidden md:inline'> Likes</span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
          <Image src="/comment.png" alt="" width={16} height={16} className='cursor-pointer' />
          <span className='text-gray-300'>|</span>
          <span className="text-gray-500">
            {commentNumber}<span className='hidden md:inline'> Comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
          <Image src="/share.png" alt="" width={16} height={16} className='cursor-pointer' />
          <span className='text-gray-300'>|</span>
          <span className="text-gray-500">
            0<span className='hidden md:inline'> Shares</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostInteraction