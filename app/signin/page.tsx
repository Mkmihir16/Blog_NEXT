'use client';
import { SignIn } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Navbar/>
      <SignIn />
    </div>
  );
}
