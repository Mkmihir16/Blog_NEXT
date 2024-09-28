// import { getUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET(req: Request, { params }: { params: { id: string } }){
  const {id}=params;
  
    try {
        const user =await clerkClient.users.getUser(id);
        return NextResponse.json({profileimg:user.imageUrl})
        // return NextResponse.json({profile:`${user.profileImageUrl}`})
      } catch (error) {
        NextResponse.json({ error: "User not found" });
      }
}