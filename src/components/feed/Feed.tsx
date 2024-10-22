import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import Post from "./Post"

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = auth()

  let posts: any[] = []

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username,
        }
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
  console.log(posts);

  if (!userId) return null
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex flex-col gap-12">
      <Post />
    </div>
  )
}

export default Feed