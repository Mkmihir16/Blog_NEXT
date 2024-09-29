import Post from "@/app/models/postmodel";
import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    await dbConnect(); // Connect to the database
    const { id } = params; // Get the ID from the request parameters

    try {
        if (id) {
            const deletedPost = await Post.findByIdAndDelete(id); // Delete the post by ID
            if (!deletedPost) {
                return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
            }
            return NextResponse.json({ success: true, message: 'Post deleted successfully' }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error deleting post:', error); // Log the error for debugging
        return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 });
    }
}
