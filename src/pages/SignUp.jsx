import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; //visable eye and hidden eye
import { Link, useNavigate } from "react-router-dom";
//firebase packa...
import { database } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  //navigation
  const navigate = useNavigate();

  // password toggle state
  const [showPassword, setShowPassword] = useState(false);

  //toggle password function
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  //Form data state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  //distructing the form data
  const { email, password, fullname } = formData;

  //handling onchange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // //Handle a submit
  function onSubmit(e) {
    e.preventDefault();

    //formData validation
    if (!fullname || !email || !password) {
      return alert("please enter a full name");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        //udating the user
        updateProfile(auth.currentUser, {
          displayName: fullname,
        });

        //Getting the user crediantial details
        const userCrediantials = res.user;

        console.log(userCrediantials);

        //Posting data into the database
       await addDoc(collection(database, "users"), {
          userId: userCrediantials.uid,
          fullname: fullname,
          email: email
        });

        //navigating the user to main page if sign up  is successful
        navigate("/");
      })
      .catch((err) => {
        console.log("Error creating account");
        alert(err.code);
      });
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto space-x-3">
        <div className="md:w-[60%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full"
            src="https://i.pinimg.com/originals/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.png"
            alt="Login Imgh"
          />
        </div>

        {/* The form */}
        <div className="w-full md:w-[67%] lg:w-[40%]">
          <form onSubmit={onSubmit} className="flex flex-col space-y-3">
            {/* fullname */}
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded"
              placeholder="Full name"
            />

            {/* email */}
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded"
              placeholder="Email Address"
            />

            {/* the password inside of a div container that hold both the password and hidded and visable eye icons */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                className="w-full px-4 py-2 text-xl text-gray-700 border-gray-300 transition ease-in-out rounded"
                placeholder="Password"
              />

              {/* the toggle password icons implemantation below */}
              {showPassword ? (
                <AiOutlineEyeInvisible
                  size={25}
                  onClick={togglePass}
                  className="cursor-pointer absolute right-3 top-3"
                />
              ) : (
                <AiOutlineEye
                  onClick={togglePass}
                  size={25}
                  className="cursor-pointer absolute right-3 top-3"
                />
              )}
            </div>

            <div className="flex justify-between">
              <h5>
                Have an account?{" "}
                <Link to="/signin" className="text-red-600 font-semibold">
                  Sign in
                </Link>
              </h5>
            </div>

            {/* the button of the loginn form */}
            <button
              type="submit"
              // onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-sm shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800"
            >
              SIGN UP
            </button>

            {/* or */}
            <div className="my-4 before:border-t flex before:flex-1 items-center after:border-t after:flex-1 ">
              <p className="text-center font-semibold mx-4 before:border-gray-300">
                OR
              </p>
            </div>

            {/* the continue button with google */}
            <button
              type="button"
              className="w-full bg-red-600 text-white py-3 rounded-sm flex justify-center items-center space-x-2  hover:bg-red-700 transition duration-150 ease-in-out active:bg-red-800"
            >
              {" "}
              <FaGoogle size={20} />
              <span>CONTINUE WITH GOOGLE</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
