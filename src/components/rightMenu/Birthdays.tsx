import Image from "next/image"
import Link from "next/link"

const Birthdays = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* Top */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/10967711/pexels-photo-10967711.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            width={40}
            height={40}
            className="w-8 h-8 object-cover rounded-full"
            alt=""
          />
          <span className="font-semibold">Wayne burton</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Celebrate
          </button>
        </div>
      </div>
      {/* Upcoming */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <Image
          src="/gift.png"
          alt=""
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-700 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">
            See other 16 have upcoming birthdays.
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Birthdays