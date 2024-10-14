import Image from 'next/image'
import { IoIosMore } from 'react-icons/io'

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="https://images.pexels.com/photos/28319901/pexels-photo-28319901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={10} height={10} className="w-10 h-10 rounded-full" />
          <span className="font-medium">Jack MaBride</span>
        </div>
        <IoIosMore width={16} height={16} />
      </div>
      {/* Desc */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image src="https://images.pexels.com/photos/28192579/pexels-photo-28192579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="object-over rounded-md" fill />
        </div>
        <p>Success is not a destination, but a journey fueled by passion and persistence. Every step forward, no matter how small, brings you closer to your dreams. Along the way, remember to take care of your mind and body, for they are the vessels that carry you through life’s challenges. Don’t let setbacks define you; let them refine you. Keep pushing, stay focused, and never lose sight of the life you’re working to create. Your future self will thank you for every effort you make today.</p>
      </div>
      {/* Interaction */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
            <Image src="/like.png" alt="" width={16} height={16} className='cursor-pointer' />
            <span className='text-gray-300'>|</span>
            <span className="text-gray-500">
              66<span className='hidden md:inline'> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
            <Image src="/comment.png" alt="" width={16} height={16} className='cursor-pointer' />
            <span className='text-gray-300'>|</span>
            <span className="text-gray-500">
              100<span className='hidden md:inline'> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-lg">
            <Image src="/share.png" alt="" width={16} height={16} className='cursor-pointer' />
            <span className='text-gray-300'>|</span>
            <span className="text-gray-500">
              88<span className='hidden md:inline'> Shares</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post