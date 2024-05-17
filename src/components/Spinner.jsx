import React from 'react'
//import { CgSpinner } from 'react-icons/cg'
import SpinnerLoading from "../assets/spinner.svg"

export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex flrx-col justify-center items-center h-full w-full fixed top-0 bottom-0 right-0 left-0 z-40'>
      <div>
        <img src={SpinnerLoading} alt='Loading...' />
      </div>
    </div>
  )
}
