import Link from "next/link"
import { IoIosPeople } from "react-icons/io"
import { IoHomeOutline } from "react-icons/io5"
import { MdOutlineHistory } from "react-icons/md"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-xl text-blue-600 ">NextSocial</Link>
      </div>
      {/* Center */}
      <div className="hidden md:flex w-[50%]">
        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex gap-2 items-center">
            <IoHomeOutline width={16} height={16} className="w-4 h-4"/>
            <span>Home</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <IoIosPeople width={16} height={16} className="w-4 h-4" />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2 items-center">
            <MdOutlineHistory width={16} height={16} className="w-4 h-4" />
            <span>Stories</span>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="w-[30%] flex items-center justify-end gap-4 xl:gap-8">
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar