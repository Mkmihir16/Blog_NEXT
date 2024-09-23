'use client'
import {useEffect} from 'react'
import { Signupform } from '../components/Form'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
const page = () => {
    const { isSignedIn, isLoaded } = useUser(); // Clerk user status
    const router = useRouter();
  
    useEffect(() => {
      if (!isSignedIn && isLoaded) {
        router.push("/signin"); // Redirect to Clerk sign-in page if not signed in
      }
    }, [isSignedIn, isLoaded, router]);
  
    // Show loading state while Clerk is loading the authentication status
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if(isSignedIn){

  return (
    <div>
        <div>
        <Navbar/>
        </div>
        <div className='mt-28'>
        <Signupform/>
        </div>
    </div>
  )
}
}
export default page
