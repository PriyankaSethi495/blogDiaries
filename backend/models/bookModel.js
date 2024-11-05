import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        country: {
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
            required: false,
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

export const Book = mongoose.model('Cats', bookSchema);