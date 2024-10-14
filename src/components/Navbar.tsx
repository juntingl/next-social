import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { IoIosPeople, IoMdNotificationsOutline } from "react-icons/io"
import { IoHomeOutline } from "react-icons/io5"
import { MdOutlineHistory } from "react-icons/md"
import MobileMenu from "./MobileMenu"
import { GoPeople } from "react-icons/go"
import { AiOutlineMessage } from "react-icons/ai"
import { FaRegCircleUser } from "react-icons/fa6"

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
            <IoHomeOutline width={16} height={16} className="w-4 h-4" />
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
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-stone-300 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >
              Loading...
            </span>
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="cursor-pointer">
              <GoPeople width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <AiOutlineMessage width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <IoMdNotificationsOutline width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2">
              <FaRegCircleUser width={20} height={20} />
              <Link href="/sign-in">Login/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar