"use client";
import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import axios, {AxiosResponse} from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
// import { error } from "console";
export  function Signupform() {
  const router=useRouter();
  const user=useUser();
  const userId=user.isSignedIn?user.user.id:'';
    const [title,settitle]=useState("");
    const [content,setcontent]=useState("");
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
const data={
    userId,
    title,
    content
}
try {
  // Ensure the return type of axios.post is explicitly set
  // const response: AxiosResponse<any> = await axios.post("http://localhost:3000/api/posts", data);
  const response: AxiosResponse<any> = await axios.post(`${window.location.origin}/api/posts`, data);
  // Success message and redirect
  toast.success("Blog created successfully!");
  setTimeout(() => {
    router.push("/");  // Redirect to home page after success
  }, 2000);  // Delay for toast
} catch (error) {
  toast.error("Error creating blog");
}
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
       Create Blog
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Title of Blog</Label>
            <Input id="firstname" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title" type="text" />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Content</Label>
            {/* <Input id="firstname" placeholder="Title" type="text" /> */}
            <Textarea value={content} onChange={(e)=>setcontent(e.target.value)}></Textarea>
          </LabelInputContainer>
        </div>
        <button
       onClick={()=>handleSubmit}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

    
      </form>
      <ToastContainer position="top-right" autoClose={2000} /> 
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
