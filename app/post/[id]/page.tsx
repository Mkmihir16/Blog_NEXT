'use client'; // Make sure to specify this for client-side functionality
import useSWR from 'swr';
import fetcher from '@/app/utils/fetcher';
import Image from 'next/image';
import img from "../../public/assets/manu.webp"
import axios from 'axios';
import { useState,useEffect } from 'react';
import Post from '@/app/models/postmodel';
import Loader from '@/app/components/ui/Loader';
interface Post {
    id: string;
    title: string;
    content: string;
    userId:String;
}

// Accepts params directly as props
export default  function    PostPage({ params }: { params: { id: string } }) {
    const [username,setusername]=useState("")
    const [imgurl,setimgurl]=useState("")
    const { id } = params; // Accessing id from params
    // Use SWR to fetch the post data
    const { data: post, error } = useSWR<Post>(id ? `/api/post/${id}` : null, fetcher);
    // console.log(post);
    useEffect(() => {
        // If post is available, fetch the user data based on post.clerkId
        const fetchUserData = async () => {
          if (post) {
            try {
              const response = await axios.get(`${window.location.origin}/api/getusers/${post.userId}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const newres=await axios.get(`${window.location.origin}/api/getClerkuser/${post.userId}`,{
                headers:{
                  "Content-Type":"application/json"
                }
              })
              // Set the username from the fetched user data
              setimgurl(newres.data.profileimg);
              setusername(response.data.name);
            } catch (err) {
              console.error("Error fetching user data:", err);
            }
          }
        };
        fetchUserData();
    })

    if (error) return <div>Failed to load</div>;
    if (!post) return <Loader></Loader>;

    return (
        <div className='flex justify-center items-center h-screen'>
           
            <div className='border-white bg-gray-600 rounded-lg flex flex-col justify-center   h-fit w-[90vw] '>
                <div className='flex items-center gap-3 mt-7 mx-4 '>
                    <div>
                        <Image
                         height="100"
                         width="100"
                         alt="Avatar"
                         src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUNEN3NHaEdnWURWUjhmQURSbmNiZnd4dHEifQ"
                         className="h-10 w-10 rounded-full border-2 object-cover"
                        />
                    </div>
                    <div>
                    <p className='text-xl font-semibold text-white'>{username}</p>
                    </div>
                    <div>

                    </div>
                </div>
                    <div className='mx-5 mt-3 mb-2'>
                        <h1 className='text-white font-bold text-4xl '>Title : {post.title} </h1>
                    </div>
                    <hr />
                    <div className='mx-5 mt-3 mb-4  '>
                        {/* <h1 className='text-white font-bold text-4xl '>Title : {post.title} </h1> */}
                        <p className='text-white text-2xl'>{post.content}</p>
                    </div>

            </div>
        </div>
    );
}
