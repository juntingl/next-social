"use client"

import { switchFollow } from "@/actions";
import { useOptimistic, useState } from "react"
import { useToast } from "../Toast";

const UserInfoInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string,
  isUserBlocked: boolean,
  isFollowing: boolean,
  isFollowingSent: boolean,
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") => {
      return value === "follow"
        ? {
          ...state,
          following: state.following && false,
          followingRequestSent:
            !state.following && (!state.followingRequestSent ? true : false),
        }
        : { ...state, blocked: !state.blocked }
    }
  );
  const { showToast } = useToast()

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      const res =  await switchFollow(userId);
      if (res.success) {
        showToast("Followed successfully")
        setUserState((prev) => ({
          ...prev,
          following: prev.following && false,
          followingRequestSent:
            !prev.following && !prev.followingRequestSent ? true : false,
        }));
      } else {
        showToast(res.error!)
        setUserState(() => ({...userState}));
      }
    } catch (err) { }
  };

  return (
    <>
      <form action={follow}>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 w-full">
          {optimisticState.following
            ? 'Following'
            : optimisticState.followingRequestSent
              ? 'Friend Request Sent'
              : 'Follow'}
        </button>
      </form>
      <form action="" className="self-end">
        <span className="text-red-500 text-xs cursor-pointer">Block User</span>
      </form>
    </>
  )
}

export default UserInfoInteraction