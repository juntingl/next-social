import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { User } from "@prisma/client"
import Link from "next/link"
import { FaMapMarkerAlt } from "react-icons/fa"
import { IoIosLink } from "react-icons/io"
import { IoSchool } from "react-icons/io5"
import { RxCalendar } from "react-icons/rx"
import { TbBriefcaseFilled } from "react-icons/tb"
import UserInfoInteraction from "./UserInfoInteraction"
import UpdateUser from "./UpdateUser"
import { DiVim } from "react-icons/di"

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt)
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  let isUserBlocked = false
  let isFollowing = false
  let isFollowingSent = false

  const { userId: currentUserId } = await auth()
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      }
    })
    blockRes ? (isUserBlocked = true) : (isUserBlocked = false)
    // 获取个人详情的用户是否是当前用户的关注者
    const followingRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      }
    })
    followingRes ? (isFollowing = true) : (isFollowing = false)
    // 获取个人详情的用户是否是当前用户的关注对象
    const followRequestRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      }
    })
    followRequestRes ? (isFollowingSent = true) : (isFollowingSent = false)
  }

  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-blue-500 text-xs">See all</Link>
        )}
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {" "}
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username
            }
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && (<p>{user.description}</p>)}
        {user.city && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={16} className="text-gray-400 w-4 h-4" />
            <span>Living in <b>{user.city}</b></span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <IoSchool size={16} className="text-gray-400 w-4 h-4" />
            <span>Went to <b>{user.school}</b></span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <TbBriefcaseFilled size={16} className="text-gray-400 w-4 h-4" />
            <span>Works at <b>{user.work}.</b></span>
          </div>
        )}
        {user.website && (
          <div className="flex items-center gap-2">
            <IoIosLink size={16} className="text-gray-400 w-4 h-4" />
            <Link href={user.website} className="text-blue-500">
              {user.website}
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2">
          <RxCalendar size={16} className="text-gray-400 w-4 h-4" />
          <span>Joined {formattedDate}</span>
        </div>
        {currentUserId && (currentUserId !== user.id) && (
          <UserInfoInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  )
}

export default UserInfoCard