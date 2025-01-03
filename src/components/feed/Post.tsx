import { auth } from '@clerk/nextjs/server';
import type { Post as PostType, User } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';
import Comments from './Comments';
import PostInfo from './PostInfo';
import PostInteraction from './PostInteraction';

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId } = await auth();

  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username
            }
          </span>
        </div>
        {post.user.id === userId && <PostInfo postId={post.id} />}
      </div>
      {/* Desc */}
      <div className="flex flex-col gap-4">
        {
          post.img && (
            <div className="w-full min-h-96 relative">
              <Image
                src={post.img}
                alt=""
                className="object-over rounded-md"
                fill
              />
            </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* Interaction */}
      <Suspense fallback={"Loading...."}>
        <PostInteraction
          postId={post.id}
          likes={post.likes.map(like => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      {/* Comments */}
      <Suspense fallback={"Loading...."}>
        <Comments postId={post.id} />
      </Suspense>
    </div>
  )
}

export default Post