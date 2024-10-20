"use client";
import { cn } from "../../lib/utils";
// import { Roboto } from '@next/font/google';
import Image from "next/image";
import { useState,useEffect } from "react";
import img from "../../public/assets/manu.webp"
import axios from "axios";
import Link from "next/link";
import Loader from "./Loader";
export  function CardDemo() {
  const [posts, setPosts] = useState<any[]>([]); // Type the posts appropriately if you know the structure
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await axios.get("/api/posts", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const postData = res.data.data; // Assuming `data` contains the posts array
        const postsWithUserDetails = await Promise.all(
          postData.map(async (post: any) => {
            try {
              const userRes = await axios.get(`/api/getusers/${post.userId}`);
              const profileImgRes = await axios.get(`/api/getClerkuser/${post.userId}`);

              return {
                ...post,
                userName: userRes.data.name,
                profileImage: profileImgRes.data.profileimg || img, // Fallback to default image if not found
              };
            } catch (error) {
              console.error("Error fetching user data:", error);
              return {
                ...post,
                userName: "Unknown User",
                profileImage: img, // Fallback to default image
              };
            }
          })
        )
          setPosts(postsWithUserDetails);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    }

    loadPosts();
  }, []); 
  if (loading) return <Loader></Loader>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="flex gap-10 flex-wrap justify-center mx-4">

    {posts.map((post,key)=>
    
    (
      <Link href={`/post/${post._id}`}>
      <div className="max-w-xs w-[20vw] group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "bg-[url(https://images.unsplash.com/photo-1580824469841-49c0f1401393?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover"
        )}
      >
        <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
        <div className="flex flex-row items-center space-x-4 z-10">
        
          <Image
            height="100"
            width="100"
            alt="Avatar"
            src={post.profileImage || img} 
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-normal text-base text-gray-50 relative z-10">
            {post.userName || "Anonymous"}
            </p>
            <p className="text-sm text-gray-400">2 min read</p>
          </div>
        </div>
        <div className="text content">
          <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
            {post.title}
          </h1>
          <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
          {post.content.split(" ").slice(0, 15).join(" ")}...
          </p>
        </div>
      </div>
    </div>
      </Link>
      
    ))}
    </div>
  );
}