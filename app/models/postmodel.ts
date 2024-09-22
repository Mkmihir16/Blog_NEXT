import mongoose, { Document, Model, Schema } from "mongoose";
interface IPost extends Document {
    title: string;
    content: string;
  }
const postsschema:Schema=new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
      },
      content: {
        type: String,
        required: [true, 'Please provide content'],
      },
    }, {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
)
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postsschema);

export default Post;