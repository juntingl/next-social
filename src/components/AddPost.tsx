import Image from 'next/image'

const AddPost = () => {
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <div className="">
        <Image src="https://images.pexels.com/photos/28704749/pexels-photo-28704749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" width={48} height={48} className='w-12 h-12 object-cover rounded-full' />
      </div>
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <div className="flex gap-4">
          <textarea name="" id="" placeholder="What's on your mind?" className='flex-1 bg-slate-100 rounded-lg p-2'></textarea>
          <Image src="/emoji.png" alt="" width={20} height={20} className='w-5 h-5 cursor-pointer' />
        </div>
        {/* Post Options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" alt="Photo" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="Video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="Poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addEvent.png" alt="Event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost