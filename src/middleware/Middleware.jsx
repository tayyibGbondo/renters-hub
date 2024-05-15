import React from "react";
import { Outlet, Navigate } from "react-router";
import useAuthStatus from "../hoock/useAuthStatus";

export default function Middleware() {
    const {loggedIn, loading} = useAuthStatus()

    if(loading){
      console.log("Loading...");
      return <h1>Loading....</h1>
    }
  
    console.log("Not Loading...");
    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
