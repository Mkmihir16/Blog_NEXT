// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Post from '@/app/models/postmodel';
export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({});
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newPost = new Post(body);
    const savedPost = await newPost.save();
    return NextResponse.json({ success: true, data: savedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create post' });
  }}
