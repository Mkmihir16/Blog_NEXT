'use client'
import { useRouter } from "next/navigation"
import { useEffect,useState } from "react"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import axios from "axios"
import { cn } from "@/app/lib/utils"
import { Label } from "@/app/components/ui/label"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import Navbar from "@/app/components/Navbar"
import { log } from "console"
// import { console } from "inspector"
export default  function page({ params }: { params: { id: string } }) {
    const router=useRouter();
    const [title,setTitle]=useState('')
    const[content,setcontent]=useState('')
    const[post,setPost]=useState([])
    const {id}=params;
    // const [clerkid,setclerid]=useState();
    console.log(id);
    // console.log(params)
    useEffect(() => {
        if (id) {
          const fetchPost = async () => {
            try {
              const response = await axios.get(`/api/editPost/${id}`); 
              setPost(response.data); 
              console.log(response.data)
              setTitle(response.data.postdata.title)
              setcontent(response.data.postdata.content)
            } catch (error) {
              console.error("Error fetching post data:", error);
            }
          };
          fetchPost(); // Call the fetch function
        }
      }, [id]); 
      const handleSubmit=async()=>{
        const data={
            title,
            content
          }
          try{
          const response=await axios.post(`${window.location.origin}/api/editPost/${id}`,data).then(()=>{

            router.push("/profile")
            toast.success("Blog updated successfully!");
          })
          console.log(response);
        }
        catch(e){
          toast.error("error")
          // router.push()
        }
        
        console.log("Form submitted");
        
      }
    //   console.log(title+" "+content)
  return (
    <>
    <Navbar/>
    <div className="max-w-md mt-24 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
       Update Blog
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Title of Blog</Label>
            <Input id="firstname" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" type="text" />
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Content</Label>
            <Textarea value={content} onChange={(e)=>setcontent(e.target.value)}></Textarea>
          </LabelInputContainer>
        </div>
        <button
       onClick={handleSubmit}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Update
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

    
      </form>
      <ToastContainer position="top-right" autoClose={3000} /> 
    </div>
    </>
  )
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
  

