import Link from "next/link"
import Image from "next/image"
import { FaMapMarkerAlt } from "react-icons/fa"
import { IoSchool } from "react-icons/io5"
import { TbBriefcaseFilled } from "react-icons/tb"
import { IoIosLink } from "react-icons/io"
import { RxCalendar } from "react-icons/rx"

const UserInfoCard = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>
      {/* Bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">Lloyd Fleming</span>
          <span className="text-sm">@jonathan</span>
        </div>
        <p className="">
          Success is not a destination, but a journey fueled by passion and persistence. Every step forward, no matter how small, brings you closer to your dreams. Along the way, remember to take care of your mind and body, for they are the vessels that carry you through life’s challenges. Don’t let setbacks define you; let them refine you. Keep pushing,
        </p>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt size={16} className="text-gray-400 w-4 h-4"/>
          <span>Living in <b>Denver</b></span>
        </div>
        <div className="flex items-center gap-2">
          <IoSchool size={16} className="text-gray-400 w-4 h-4"/>
          <span>Went to Edgar High School</span>
        </div>
        <div className="flex items-center gap-2">
          <TbBriefcaseFilled size={16} className="text-gray-400 w-4 h-4"/>
          <span>Works at <b>Apple Inc.</b></span>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <div className="flex items-center gap-1">
            <IoIosLink size={16} className="text-gray-400 w-4 h-4"/>
            <Link href="https://lama.dev" className="text-blue-500">lama.dev</Link>
          </div>
          <div className="flex items-center gap-1">
            <RxCalendar size={16} className="text-gray-400 w-4 h-4"/>
            <span>Joined November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
        <span className="text-red-500 self-end text-xs cursor-pointer">Block User</span>
      </div>
    </div>
  )
}

export default UserInfoCard