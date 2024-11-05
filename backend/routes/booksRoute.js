import express from 'express';
import { Book } from '../models/bookModel.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

    const router = express.Router();
    const upload = multer({ dest: 'uploads/' });  // Temporary storage

    // Save a new book
    router.post('/', upload.single('image'), async (request, response) => {
        try {
            const { title, author, publishYear, content } = request.body;
            
            // Check for required fields
            if (!title || !author || !publishYear || !content) {
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
                title,
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

    //Update book
    router.put('/:id', async(request, response)=>{
        try {
            if (
                !request.body.title ||
                !request.body.author ||
                !request.body.publishYear ||
                !request.body.content
            ) {
                return response.status(400).send({message: "Send all required fields"})
            }

            const {id} = request.params;

            const result = await Book.findByIdAndUpdate(id, request.body); 
            if (!result) {
                return response.status(404).json({message: "Book not found"});
            }
            return response.status(200).json({message: "Book updated successfully"});

        } catch(error) {
            console.log(error.message);
            response.status(500).send({message: error.message});
        }
    })

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