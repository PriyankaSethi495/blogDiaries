import express from 'express';
import { Book } from '../models/bookModel.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

    const router = express.Router();
    const upload = multer({ dest: 'uploads/' });  // Temporary storage

    // Save a new book
    router.post('/', upload.single('image'), async (request, response) => {
        try {
            const { country, author, publishYear, content } = request.body;
            
            // Check for required fields
            if (!country || !author || !publishYear) {
                return response.status(400).send({ message: "Send all required fields" });
            }
    
            let imageUrl = null;
    
            // Upload image to Cloudinary if provided
            if (request.file) {
                const result = await cloudinary.uploader.upload(request.file.path);
                imageUrl = result.secure_url; // Cloudinary's URL for the uploaded image
            }
    
            // Create a new book entry with image URL if available
            const newBook = await Book.create({
                country,
                author,
                publishYear,
                content,
                imageUrl,
            });
    
            return response.status(200).json(newBook);
    
        } catch (error) {
            console.error(error.message);
            response.status(500).send({ message: error.message });
        }
    });

    //Get books
    router.get('/', async (request, response)=>{
        try {
            const books = await Book.find({});
            return response.status(200).json({
                count: books.length,
                data: books,
            });

        }
        catch(error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    })

    //Get books by id
    router.get('/:id', async (request, response)=>{
        try {
            const {id} = request.params;
            const books = await Book.findById(id);
            return response.status(200).json(books);

        }
        catch(error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    })

    // Update book including image upload
router.put('/:id', upload.single('image'), async (request, response) => {
    try {
        const { id } = request.params;

        // Find the existing book
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }

        const { country, author, publishYear, content } = request.body;
        let imageUrl = book.imageUrl; // Default to existing imageUrl

        // Update image if a new file is uploaded
        if (request.file) {
            const result = await cloudinary.uploader.upload(request.file.path);
            imageUrl = result.secure_url; // Cloudinary's URL for the uploaded image
        }

        // Update the book document with new or existing data
        book.country = country || book.country;
        book.author = author || book.author;
        book.publishYear = publishYear || book.publishYear;
        book.content = content || book.content;
        book.imageUrl = imageUrl;

        // Save the updated book
        await book.save();

        return response.status(200).json({ message: "Book updated successfully", data: book });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

    //Delete a book 
    router.delete('/:id', async(request, response)=>{
        try {
            const {id} = request.params;
            const result = await Book.findByIdAndDelete(id);
            if (!result) {
                return response.status(404).json({message: "Book not found"});
            }
            return response.status(200).json({message: "Book updated successfully"});
        } catch(error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    })

    export default router;