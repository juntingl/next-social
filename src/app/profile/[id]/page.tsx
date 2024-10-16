import Image from "next/image"

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
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative">
            <Image
              src="https://images.pexels.com/photos/28665518/pexels-photo-28665518.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
              fill
              className="rounded-md object-cover"
            />
            <Image
              src="https://images.pexels.com/photos/28840686/pexels-photo-28840686.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
              width={128}
              height={128}
              className="absolute rounded-full w-32 h-32 left-0 right-0 m-auto -bottom-16 ring-1 ring-white z-10 object-cover"
            />
          </div>
          <h1 className="mt-20 mb-4 text-2xl font-medium">
            Alice Johnson
          </h1>
          <div className="flex items-center justify-center gap-12 mb-4">
            <div className="flex flex-col items-center">
              <span className="font-medium">100</span>
              <span className="text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">600</span>
              <span className="text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium">100</span>
              <span className="text-sm">Following</span>
            </div>
          </div>
        </div>
        <Feed />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu userId="1" />
      </div>
    </div>
  )
}

export default ProfilePage