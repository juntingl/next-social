import { User } from "@prisma/client"
import Ad from "./Ad"
import Birthdays from "./Birthdays"
import FriendRequests from "./FriendRequests"
import UserInfoCard from "./UserInfoCard"
import UserMediaCard from "./UserMediaCard"
import { Suspense } from "react"
import Skeleton, { UserMediaCardSkeleton } from "../Skeleton"

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (<>
        <Suspense fallback={<Skeleton />}>
          <UserInfoCard user={user} />
        </Suspense>
        <Suspense fallback={<UserMediaCardSkeleton />}>
          <UserMediaCard user={user} />
        </Suspense>
      </>) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  )
}

export default RightMenu