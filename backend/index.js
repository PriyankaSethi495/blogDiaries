import express, { response } from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import 'dotenv/config';  // Automatically loads environment variables from .env

const port = process.env.PORT || 4000;
const mongoDBURL = process.env.MONGODB_URI;


const app = express(); 

//Middleware to parse request body
app.use(express.json());

//Middleware for handling cors policy
//default with * allow all origins
app.use(cors());
// app.options('*', cors()); // Handle preflight requests


//for specific origin and methods and headers
// app.use(cors(
//     {
//         origin: 'http://localhost:5173',

//     }
// ));
// app.options('*', cors()); // Handle preflight requests

app.get('/',(request, response)=> {
    console.log(request);
    return response.status(234).send("Welcome to Priyanka\'s store");
});


//Middleware to pass booksRoute 
app.use('/books', booksRoute);

//connect to db
mongoose.connect(mongoDBURL).then(()=>{
    console.log("App connected to database");
    app.listen(port, ()=> {
        console.log(`App is listening to port: ${port}`);
    })
})
.catch((error)=>{
    console.log(error);
});