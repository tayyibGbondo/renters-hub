import { getAuth, updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { database } from "../firebaseConfig";

export default function Profile() {
  //Handling useNavigate
  const navigaate = useNavigate();

  const auth = getAuth();

  const [updateUserProfile, setUpdateUserProfile] = useState(false);
  //toggle of the edit page
  const toggleEdit = () => {
    setUpdateUserProfile(!updateUserProfile);
  };

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  //Logout functionality
  const logout = () => {
    auth.signOut();
    navigaate("/");
  };

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update the display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update data in firestore
        const docRef = doc(database, "users", auth.currentUser.uid);
        await updateDoc(collection(docRef), {
          fullname: name,
        });
      }

      alert("user updated successfully");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>

        <div className=" w-full md:w-[50%] px-3">
          <form>
            {/* name input */}
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              disabled={!updateProfile}
              className={`${
                updateProfile ? "bg-gray-200  focus:bg-red-300" : "bg-white"
              } mb-6 w-full px-4 text-xl text-gray-700 py-2 transition ease-in-out rounded border border-gray-300`}
            />

            {/* email input */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              disabled={!updateProfile}
              className={`${
                updateProfile ? "bg-gray-200 focus:bg-red-300" : "bg-white"
              } mb-6 w-full px-4 text-xl text-gray-700 py-2 transition ease-in-out rounded border border-gray-300`}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Do you want to change your name?{" "}
                <span
                  onClick={ toggleEdit  && onSubmit}
                  className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {updateProfile ? "Update" : "Edit"}
                </span>
              </p>
              <p
                onClick={logout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
