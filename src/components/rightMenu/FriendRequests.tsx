import Link from "next/link"
import Image from "next/image"
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io"

const FriendRequests = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>
      {/* User */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/28838755/pexels-photo-28838755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              Wayne Burton
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <IoMdCheckmarkCircle size={20} className="text-blue-500 w-5 h-5 cursor-pointer" />
            <IoMdCloseCircle size={20} className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/28838755/pexels-photo-28838755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              Wayne Burton
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <IoMdCheckmarkCircle size={20} className="text-blue-500 w-5 h-5 cursor-pointer" />
            <IoMdCloseCircle size={20} className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/28838755/pexels-photo-28838755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              Wayne Burton
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <IoMdCheckmarkCircle size={20} className="text-blue-500 w-5 h-5 cursor-pointer" />
            <IoMdCloseCircle size={20} className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/28838755/pexels-photo-28838755.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              Wayne Burton
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <IoMdCheckmarkCircle size={20} className="text-blue-500 w-5 h-5 cursor-pointer" />
            <IoMdCloseCircle size={20} className="text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequests