import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type:String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,  // Store the URL of the image
            required: false,  // Image is optional
        },
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Cat', bookSchema);