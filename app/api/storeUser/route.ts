import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/userModel";

// POST request handler
export async function POST(req: Request) {
    try {
        const { clerkId, name, email } = await req.json(); // Parse the JSON request body

        // Validate that required fields are present
        if (!clerkId || !name || !email) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }
        
        // Connect to the database
        await dbConnect();
        // Find and update the user, or create a new user if not found
        const user = await User.findOneAndUpdate(
            { clerkId }, // Find user by Clerk ID
            { name, email }, // Update with name and email
            { new: true, upsert: true, runValidators: true } // Upsert option to create if not found
        );

        // Respond with the updated or newly created user
        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Error storing user data:", error);
        return NextResponse.json(
            { success: false, message: "Database error" },
            { status: 500 }
        );
    }
}
