import Image from "next/image"

import Feed from "@/components/Feed"
import LeftMenu from "@/components/LeftMenu"
import RightMenu from "@/components/RightMenu"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  if (!params.username) return null

  const user = await prisma.user.findFirst({
    where: {
      username: params.username
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          followings: true,
        }
      }
    }
  })

  if (!user) return notFound()

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative">
            <Image
              src={user.cover || '/noCover.png'}
              alt=""
              fill
              sizes="100vw"
              className="rounded-md object-cover"
            />
            <Image
              src={user.avatar || '/noAvatar.png'}
              alt=""
              width={128}
              height={128}
              className="absolute rounded-full w-32 h-32 left-0 right-0 m-auto -bottom-16 ring-1 ring-white z-10 object-cover"
            />
          </div>
          <h1 className="mt-20 mb-4 text-2xl font-medium">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </h1>
          <div className="flex items-center justify-center gap-12 mb-4">
            <div className="flex flex-col items-center">
              <span className="font-medium">{user._count.posts}</span>
              <span className="text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">{user._count.followers}</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">{user._count.followings}</span>
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>
        <Feed username={user.username} />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  )
}

export default ProfilePage