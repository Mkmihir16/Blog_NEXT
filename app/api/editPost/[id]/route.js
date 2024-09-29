import dbConnect from "@/app/lib/dbConnect"
import Post from "@/app/models/postmodel"
import { NextResponse } from "next/server";
 export  async function GET(req,{params}){
    await dbConnect();
    const {id}=params
    console.log(id)
    console.log(params)
    try {
        const data = await Post.findOne({ _id: id }); // Await the database query
    
        if (!data) {
          return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
    
        return NextResponse.json({ postdata: data }, { status: 200 });
      } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
      }
 }
 export async function POST(req,{params}){
    try {
        await dbConnect();
        const { id } = params;
    
        const body = await req.json();
        
        // Check if title and content are provided in the request body
        const { title, content } = body;
        if (!title || !content) {
          return NextResponse.json({ success: false, error: 'Title and content are required' }, { status: 400 });
        }
    
        // Update the post in the database
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, content }, // Update object
          { new: true, runValidators: true } 
        );
        if(updatedPost){
            return NextResponse.json({msg :"Post is updated"})
        }
    }
    catch(e){
        return NextResponse.json({ success: false, error: 'Failed to update post' });
    }
 }