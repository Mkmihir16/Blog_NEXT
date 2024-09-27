// app/api/post/[id]/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Post from '@/app/models/postmodel';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    
    const { id } = params; 

    try {
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json({ msg: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 }); // Return the post data
    } catch (error) {
        return NextResponse.json({ msg: 'Server error', error }, { status: 500 });
    }
}
