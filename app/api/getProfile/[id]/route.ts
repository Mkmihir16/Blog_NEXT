import dbConnect from "@/app/lib/dbConnect"; // Ensure this path is correct
import Post from "@/app/models/postmodel";   // Ensure this path is correct
import { NextResponse } from 'next/server';  // Use Next.js 13+ `NextResponse` for responses

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id: userId } = params; // Get the userId from the URL
    console.log(userId);
    await dbConnect();

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        // Fetch posts or profiles where the userId matches the one from the URL parameter
        const userPosts = await Post.find({ userId });
        return NextResponse.json(userPosts, { status: 200 });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
    }
}
