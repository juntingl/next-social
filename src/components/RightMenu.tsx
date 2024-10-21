import Ad from "./Ad"
import Birthdays from "./Birthdays"
import FriendRequests from "./FriendRequests"
import UserInfoCard from "./UserInfoCard"
import UserMediaCard from "./UserMediaCard"

const RightMenu = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (<>
        <UserInfoCard />
        <UserMediaCard />
      </>) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  )
}

export default RightMenu