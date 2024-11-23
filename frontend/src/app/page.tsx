"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dashboard, Navbar } from "../components";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const MainPage: React.FC = () => {
  const usertoken = useSelector((state: RootState) => state.authslice.usertoken);

  console.log(usertoken, "token")
  const isuerlogin = !!usertoken;
  const router = useRouter();
  console.log(isuerlogin)

  useEffect(() => {

    if (isuerlogin) {
      router.push("/");
    } else {
      router.push("/auth/signin");
    }
  }, [isuerlogin, router]);

  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

export default MainPage;
