import Image from "next/image"
import Link from "next/link"
import AvatarList from "./AvatarList";

const avatars = [
  { id: 1, name: "Alice Johnson", imageUrl: "https://images.pexels.com/photos/28880833/pexels-photo-28880833.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" },
  { id: 2, name: 'Bob Smith', imageUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 3, name: 'Charlie Brown' },
  { id: 4, name: 'Diana Prince', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 5, name: 'Ethan Hunt', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  { id: 6, name: 'Fiona Gallagher' },
  { id: 7, name: 'George Washington' },
];

const ProfileCard = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/28665518/pexels-photo-28665518.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src="https://images.pexels.com/photos/28840686/pexels-photo-28840686.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          width={48}
          height={48}
          className="absolute rounded-full w-12 h-12 left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10 object-cover"
        />
      </div>
      <div className="min-h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">Edward Gabriel May</span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <AvatarList avatars={avatars} maxVisible={3} size={24}/>
          </div>
          <span className="text-xs text-gray-500">
            {avatars.length} Followers
          </span>
        </div>
        <Link href="/">
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard