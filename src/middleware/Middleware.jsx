import React from "react";
import { Outlet, Navigate } from "react-router";
import useAuthStatus from "../hoock/useAuthStatus";
import Spinner from "../components/Spinner";

export default function Middleware() {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
