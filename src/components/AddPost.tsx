"use client";

import { addPost } from '@/actions'
import Image from 'next/image'
import { useState } from 'react'
import AddPostButton from './AddPostButton'
import { useUser } from '@clerk/nextjs';
import { useToast } from './Toast';
import { CldUploadWidget } from 'next-cloudinary';
import { mockImage } from '@/lib/mock';

const AddPost = () => {
  const { user, isLoaded } = useUser()
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState<any>()
  const { showToast } = useToast()

  if (!isLoaded ) {
    return "Loading..."
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await addPost({ desc, img })
    if (res && !res?.success) {
      showToast(res?.error || "Something went wrong")
      return
    }
    showToast("Post added successfully")
    setDesc("")
    setImg(null)
  }

  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* Avatar */}
      <div className="">
        <Image
          src={user?.imageUrl || "/noAvatar.png"}
          width={48}
          height={48}
          alt=""
          className='w-12 h-12 object-cover rounded-full'
        />
      </div>
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <textarea
            name="desc"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="What's on your mind?"
            className='flex-1 bg-slate-100 rounded-lg p-2'
          ></textarea>
          <div className="">
            <Image src="/emoji.png" alt="" width={20} height={20} className='w-5 h-5 cursor-pointer' />
            <AddPostButton />
          </div>
        </form>
        {/* Post Options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400">
          <CldUploadWidget
            uploadPreset='social'
            onSuccess={(result, { widget }) => {
              setImg(result.info)
              widget.close()
            }}
            onClose={() => {
              setImg(mockImage())
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image src="/addimage.png" alt="Photo" width={20} height={20} />
                  Photo
                </div>
              )
            }}
          </CldUploadWidget>
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