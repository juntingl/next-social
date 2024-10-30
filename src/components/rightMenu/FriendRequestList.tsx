"use client"

import { acceptFollowRequest, declineFollowRequest } from "@/actions";
import { FollowRequest, User } from "@prisma/client"
import Image from "next/image"
import { useOptimistic, useState } from "react";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io"

type RequestWithUser = FollowRequest & {
  sender: User;
}

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestsState, setRequestsState] = useState(requests)
  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestsState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId)
    try {
      await acceptFollowRequest(userId)
      setRequestsState((prev) => prev.filter(req => req.id !== requestId))
    } catch (error) {
      console.log(error)
    }
  }

  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequests(requestId)
    try {
      await declineFollowRequest(userId)
      setRequestsState((prev) => prev.filter(req => req.id !== requestId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {optimisticRequests.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || '/noAvatar.png'}
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username }
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)} className="">
              <button>
                <IoMdCheckmarkCircle size={20} className="text-blue-500 w-5 h-5 cursor-pointer" />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
                <IoMdCloseCircle size={20} className="text-gray-400 w-5 h-5 cursor-pointer" />
              </button>
            </form>
          </div>
        </div>)
      )}
    </div>
  )
}

export default FriendRequestList