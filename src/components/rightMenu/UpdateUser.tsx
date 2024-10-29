
"use client"

import Image from "next/image";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";
import { uploadProfile } from "@/actions";
import { mockImage } from "@/lib/mock";
import { UpdateProfileZodSchemaType } from "@/schema/user";
import { useToast } from "../Toast";
import { useRouter } from "next/navigation";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState("")
  const [state, formAction, isPending] = useActionState(uploadProfile, { success: false, msg: "" });
  const router = useRouter();
  const { showToast } = useToast()

  const handleClose = () => {
    setOpen(false)
    state.success && router.refresh();
  }

  const handleSubmit = (formData: FormData) => {
    const filteredFields = Object.fromEntries(
      formData.entries().filter(([_, value]) => value !== "")
    );
    const fields = {
      ...filteredFields,
      cover
    };
    formAction({ data: fields })
    if (state.success) {
      showToast("Profile updated successfully!")
      setOpen(false)
    } else {
      showToast("Something went wrong!")
    }
  }

  return (
    <div>
      <span
        className="text-blue-500 text-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 overflow-auto overscroll-contain bg-black bg-opacity-65 flex justify-center items-center z-50 box-border">
            <form
              action={handleSubmit}
              className="relative top-6 border-box p-6 bg-white rounded-lg shadow-md w-full md:w-1/2 xl:w-1/3 overflow-auto overscroll-contain flex flex-col gap-4"
            >
              {/* Title */}
              <h1>Update Profile</h1>
              <div className="mt-4 text-xs text-gray-500">
                Use the navbar profile to change the avatar or username.
              </div>
              {/* Cover pic upload */}
              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result, {widget}) => {
                  widget.close()
                }}
                onClose={() => {
                  setCover(mockImage());
                }}
              >
                {({open}) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4"
                      onClick={() => open()}
                    >
                      <label htmlFor="">Cover Picture</label>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                          src={user.cover || '/noCover.png'}
                          alt=""
                          width={48}
                          height={32}
                          className="w-12 h-8 rounded-md object-cover"
                        />
                        <span className="text-xs underline text-gray-600">
                          Change
                        </span>
                      </div>
                    </div>
                  )
                }}
              </CldUploadWidget>
              {/* Wrapper */}
              <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">First Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder={user.name || "Please enter your name."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="" className="text-xs text-gray-500">Surname</label>
                  <input
                    name="surname"
                    type="text"
                    placeholder={user.surname || "Please enter your surname. "} className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="" className="text-xs text-gray-500">Description</label>
                  <input
                    name="description"
                    type="text"
                    placeholder={user.description || "Please enter your description."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="" className="text-xs text-gray-500">City</label>
                  <input
                    name="city"
                    type="text"
                    placeholder={user.city || "Please enter your city."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="" className="text-xs text-gray-500">School</label>
                  <input
                    name="school"
                    type="text"
                    placeholder={user.school || "Please enter your school."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="" className="text-xs text-gray-500">Work</label>
                  <input
                    name="work"
                    type="text"
                    placeholder={user.work || "Please enter your job."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label htmlFor="" className="text-xs text-gray-500">Website</label>
                  <input
                    name="website"
                    type="text"
                    placeholder={user.website || "Please enter your website url."}
                    className="ring-1 ring-gray-300 p-[6px] rounded-md text-sm"
                  />
                </div>
              </div>
              <UpdateButton />
              {state.success && (
                <span className="text-green-500">Profile has been updated!</span>
              )}
              {!state.success && (
                <span className="text-red-500">Something went wrong.</span>
              )}
              <div
                className="absolute w-6 h-6 flex items-center justify-center text-xl right-2 top-3 cursor-pointer"
                onClick={handleClose}
              >
                X
              </div>
            </form>
          </div>
      )}
    </div>
  )
};

export default UpdateUser