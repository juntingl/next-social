import Link from "next/link"
import Image from "next/image"
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import FriendRequestList from "./FriendRequestList"

const FriendRequests = async () => {
  const { userId } = await auth()
  if (!userId) return null

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true
    }
  });

  if (requests.length === 0) return null

  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>
      {/* User */}
      <FriendRequestList requests={requests} />
    </div>
  )
}

export default FriendRequests