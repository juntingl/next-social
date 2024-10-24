import prisma from '@/lib/prisma';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import CommentList from './CommentList';

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      user: true
    }
  })

  return (
    <div className=''>
      <CommentList comments={comments} postId={postId} />

      {/* Comments */}
      <div className=''>
        {/* Comment */}

      </div>
    </div>
  )
}

export default Comments