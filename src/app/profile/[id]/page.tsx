import Feed from "@/components/Feed"
import LeftMenu from "@/components/LeftMenu"
import RightMenu from "@/components/RightMenu"

const ProfilePage = () => {

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <Feed />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="1" />
      </div>
    </div>
  )
}

export default ProfilePage