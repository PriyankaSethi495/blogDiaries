import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://blogdiaries-backend-1.onrender.com/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // Set loading to false on error
            });
    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Show Book</h1>
            {loading ? (<Spinner />) :
                (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                        {/* Image Preview */}
                        {book.imageUrl && (
                            <div className='flex justify-center my-4'>
                                <img 
                                    src={book.imageUrl} 
                                    alt={`Cover of ${book.title}`} 
                                    className='w-64 h-auto object-cover rounded-lg border border-gray-300' 
                                />
                            </div>
                        )}
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span className='text-white'>{book._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Country</span>
                            <span className='text-white'>{book.country}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Author</span>
                            <span className='text-white'>{book.author}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Year of Visit</span>
                            <span className='text-white'>{book.publishYear}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Content</span>
                            <span className='text-white'>{book.content}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Created Time</span>
                            <span className='text-white'>{new Date(book.createdAt).toString()}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Last Updated Time</span>
                            <span className='text-white'>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ShowBook;
