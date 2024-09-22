
"use client";
import React, { useState,useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import Link from "next/link";
import Button from '@mui/material/Button';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';

function Navbar({ className }: { className?: string }) {
    const { isLoaded, user, isSignedIn } = useUser();  // Destructure properly

    // Ensure user data is only accessed after loading
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    // Check if user is signed in and log user details
    if (isSignedIn && user) {
        console.log(user.id + " " + user.fullName + " " + user.primaryEmailAddress?.emailAddress);
    } else {
        console.log("User is not logged in");
    }
    useEffect(() => {
        const storeUserData = async () => {
          if (user) {
            const { id, fullName, primaryEmailAddress } = user;
      
            try {
              await axios.post("/api/storeUser", {
                clerkId: id,
                name: fullName,
                email: primaryEmailAddress?.emailAddress,
              });
            } catch (error) {
              console.error("Error storing user data:", error);
            }
          }
        };
      
        storeUserData();
      }, [user]);
    const [active, setActive] = useState<string | null>(null);

    return (
        <div className="flex justify-center">
            <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
                <Menu setActive={setActive}>
                    <Link href="/">
                        <MenuItem setActive={setActive} active={active} item="Home" />
                    </Link>
                    <Link href="/create">
                        <MenuItem setActive={setActive} active={active} item="Create Blog" />
                    </Link>
                    <Link href="/profile">
                        <MenuItem setActive={setActive} active={active} item="Profile" />
                    </Link>
                </Menu>
            </div>

            <div className="inline relative top-16 left-[40%] h-[5vh] text-2xl">
                {isSignedIn ? (
                    <div className="flex items-center gap-3">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                            Hi, {user?.firstName}
                        </SignedIn>
                    </div>
                ) : (
                    <Button variant="contained">
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
