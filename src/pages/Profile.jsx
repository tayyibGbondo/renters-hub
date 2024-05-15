import { getAuth } from "firebase/auth";
import React, { useState } from "react";

export default function Profile() {
  const auth = getAuth()

  const[formData, setFormData]=useState({
    name: "Tayyib Gbondo",
    email: "test@test.com",
  })

  const {name, email} = formData

  return <>
  <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
    <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

    <div className=" w-full md:w-[50%] px-3">
      <form>
        {/* name input */}
        <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 text-xl text-gray-700 py-2 transition ease-in-out bg-white rounded border border-gray-300" />

        {/* email input */}
        <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 text-xl text-gray-700 py-2 transition ease-in-out bg-white rounded border border-gray-300" />

        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
          <p>Do you want to change your name? <span className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1">Edit</span></p>
          <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200">Sign out</p>
        </div>
      </form>
    </div>
  </section>
  </>;
}
