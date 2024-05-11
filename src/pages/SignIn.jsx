import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; //visable eye and hidden eye
import { Link } from "react-router-dom";

function SignIn() {
  // password toggle state
  const [showPassword, setShowPassword] = useState(false);

  //toggle password function
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  //Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //distructing the form data
  const { email, password } = formData;

  //handling onchange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>

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
          <form className="flex flex-col space-y-3">
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
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-400 font-bold">
                  Register
                </Link>
              </h5>

              <Link to="/forgotpassword" className="text-blue-500 font-500">
                Forgot password?
              </Link>
            </div>

            {/* the button of the loginn form */}
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-sm shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800"
            >
              SIGN IN
            </button>

            {/* or */}
            <div className="my-4 before:border-t flex before:flex-1 items-center after:border-t after:flex-1 ">
              <p className="text-center font-semibold mx-4 before:border-gray-300">OR</p>
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

export default SignIn;
