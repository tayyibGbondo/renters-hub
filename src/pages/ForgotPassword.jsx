import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  //initialize useNaviagate
  const navigate = useNavigate();

  //Form data state
  const [formData, setFormData] = useState({
    email: "",
  });

  //distructing the form data
  const { email } = formData;

  //handling onchange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //handle reset password
  async function resetPassword(e) {
    //handle page reload
    e.preventDefault();
    //firebase auth innitialization
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email)
      .then((res) => {
        alert("verification code sent to email");
        console.log(res);
      })
      .then((error) => {
        alert(error.code);
        console.log("password reset code not send");
      });
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto space-x-10">
        <div className="md:w-[60%] lg:w-[50%] mb-12 md:mb-6">
          <img
            className="w-full rounded-lg"
            src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg"
            alt="Login Imgh"
          />
        </div>

        {/* The form */}
        <div className="w-full md:w-[67%] lg:w-[40%]">
          <form onSubmit={resetPassword} className="flex flex-col space-y-3">
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 border-gray-300 rounded"
              placeholder="Email Address"
            />

            <div className="flex justify-between">
              <h5>
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-400 font-bold">
                  Register
                </Link>
              </h5>
            </div>

            {/* the button of the loginn form */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-sm shadow-md hover:bg-blue-700 transition duration-150 ease-in-out active:bg-blue-800"
            >
              SEND RESET EMAIL
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
