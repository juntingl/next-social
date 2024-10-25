import Image from "next/image"
import Link from "next/link"
import AvatarList from "./AvatarList";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const avatars = [
  { id: 1, name: "Alice Johnson", imageUrl: "https://images.pexels.com/photos/28880833/pexels-photo-28880833.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" },
  { id: 2, name: 'Bob Smith', imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 5, name: 'Ethan Hunt', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 6, name: 'Fiona Gallagher' },
  { id: 7, name: 'George Washington' },
];

const ProfileCard = async () => {
  const { userId } = await auth()
  if (!userId) return null

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      _count: {
        select: {
          followers: true
        }
      },
    }
  })

  if (!user) return null

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image
          src={user.cover || '/noCover.png'}
          alt=""
          priority
          fill
          sizes="100vw"
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || '/noAvatar.png'}
          alt=""
          width={48}
          height={48}
          className="absolute rounded-full w-12 h-12 left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
        />
      </div>
      <div className="min-h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username
          }
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <AvatarList avatars={avatars} maxVisible={3} size={24}/>
          </div>
          <span className="text-xs text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>
        <Link href={`/profile/${user.username}`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard