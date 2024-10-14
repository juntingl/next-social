import Image from 'next/image';
import { IoIosMore } from 'react-icons/io';

const Comments = () => {
  return (
    <div className=''>
      {/* Write */}
      <div className="flex items-center gap-4">
        <Image src="https://images.pexels.com/photos/27895384/pexels-photo-27895384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={32} height={32} className='w-8 h-8 rounded-full' />
        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input type="text" placeholder='Write a comment...' className='bg-transparent outline-none' />
          <Image src="/emoji.png" alt="" width={16} height={16} className='w-4 h-4 cursor-pointer' />
        </div>
      </div>
      {/* Comments */}
      <div className=''>
        {/* Comment */}
        <div className="flex gap-4 justify-between mt-6">
          {/* Avatar */}
          <Image src="https://images.pexels.com/photos/27895384/pexels-photo-27895384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={40} height={40} className='w-10 h-10 rounded-full' />
          {/* Desc */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Bernice Spencer</span>
            <p>let them refine you. Keep pushing, stay focused, and never lose sight of the life you’re working to create. Your future self will thank you for every effort you make today.</p>
            <div className="flex items-center gap-8 text-xs to-gray-500">
              <div className="flex items-center gap-4">
                <Image src="/like.png" alt="" width={16} height={16} className='cursor-pointer' />
                <span className='text-gray-300'>|</span>
                <span className="text-gray-500">
                  168<span className='hidden md:inline'> Likes</span>
                </span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* Icon */}
          <IoIosMore width={16} height={16} className='cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Comments