import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/userModel";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await dbConnect();
    
    const { id } = params; 

    try {
        const user = await User.findOne({clerkId:id});

        if (!user) {
            return NextResponse.json({ msg: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 }); // Return the post data
    } catch (error) {
        return NextResponse.json({ msg: 'Server error', error }, { status: 500 });
    }
}