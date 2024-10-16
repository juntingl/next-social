import Link from "next/link"
import Image from "next/image"

const UserMediaCard = () => {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md text-sm'>
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">See all</Link>
      </div>
      {/* Bottom */}
      <div className="grid grid-cols-4 gap-4">
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/17286179/pexels-photo-17286179.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/11399650/pexels-photo-11399650.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/17286179/pexels-photo-17286179.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/11399650/pexels-photo-11399650.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/17286179/pexels-photo-17286179.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/11399650/pexels-photo-11399650.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/17286179/pexels-photo-17286179.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="relative h-24">
          <Image
            src="https://images.pexels.com/photos/11399650/pexels-photo-11399650.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

export default UserMediaCard