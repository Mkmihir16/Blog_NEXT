'use client'
import { useUser } from "@clerk/nextjs";
import { cn } from "../lib/utils";
import Image from "next/image";
import img from "../public/assets/manu.webp"
import { useEffect, useState } from "react";
import Link from "next/link";
import edit from "../public/assets/editicon.svg";
import dlt from "../public/assets/icons8-delete.svg"
import useSWR from 'swr';
import fetcher from "../utils/fetcher";
 import axios from "axios";
import { div } from "framer-motion/m";
import Navbar from "../components/Navbar";
export default   function Profile(){
    const [userid, setuserid] = useState<string | undefined>();
    const [post,setpost]=useState([]);
    const {user}=useUser();
    console.log(user?.id)
    useEffect(() => {
        const callfun = async () => {
          if (user?.id) {
            setuserid(user.id);
            try {
              const allposts = await axios.get(`/api/getProfile/${user.id}`); // Use user.id directly
              console.log(allposts.data);
              setpost(allposts.data);
            } catch (error) {
              console.error("Error fetching posts", error);
            }
          }
        };
        callfun();
      }, [user]);
    console.log(post)
    return(
        <div>
            <Navbar/>
        <div className="flex gap-3 flex-wrap justify-center mx-4 mt-24">
            {Array.isArray(post) && post.length > 0 ? (
      post.map((post, key) => (
        
          <div className="max-w-xs w-[20vw] group/card">
            <div
              className={cn(
                " overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-[url(https://images.unsplash.com/photo-1580824469841-49c0f1401393?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                <Image
                  height="100"
                  width="100"
                  alt="Avatar"
                  src={img}
                  className="h-10 w-10 rounded-full border-2 object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-normal text-base text-gray-50 relative z-10">
                    Manu Arora
                  </p>
                  <p className="text-sm text-gray-400">2 min read</p>
                </div>
              </div>
              <Link href={`/post/${post._id}`} key={key}>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  {post.title}
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  {post.content.split(" ").slice(0, 15).join(" ")}...
                </p>
              </div>
              </Link>
            </div>
            <div className="flex gap-5">
                <Link href={`/post/delete/${post._id}`} key={key}>
                <Image
                height={27}
                width={27}
                alt="edit image"
                src={edit}
                />
                </Link>
                <Link href={`/post/edit/${post._id}`} key={key}> 
                <Image
                height={30}
                width={30}
                alt="edit image"
                src={dlt}
                />
                </Link>
            </div>
           
          </div>
       
      ))
    ) : (
      <p>No posts available</p> // Fallback message if post is empty
    )}
    </div>
    </div>
    )
}