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
  return (
    <>
      <form action="">
        <button className="bg-blue-500 text-white text-sm rounded-md p-2 w-full">
          Follow
        </button>
      </form>
      <span className="text-red-500 self-end text-xs cursor-pointer">Block User</span>
    </>
  )
}

export default UserInfoInteraction