import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {MdOutlineAddBox} from 'react-icons/md'
import BooksCard from '../components/home/BooksCard'
import BooksTable from '../components/home/BooksTable'

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showType, setShowType] =  useState('table');
    
    useEffect(() => {
      setLoading(true);
      fetch('http://localhost:5555/books')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.data);
          setBooks(data.data); // Access the `data` field
          setLoading(false);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
          setLoading(false);
        });
    }, []);
  return (
    <div className='p-4 bg-black'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-1g' onClick={()=>setShowType('table')}>
          Table
        </button>
        <button className='bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-1g' onClick={()=>setShowType('card')}>
          Card
        </button>
      </div>
      <div className='flex justify-between items-center text-white'>
        <h1 className='text-3xl my-8 text-white'>Blog Diary</h1>
        <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
        {loading ? (<Spinner/>): showType === 'table' ? (
         <BooksTable books={books}/>
        ) : (<BooksCard books={books}/>)
        }
      
    </div>
  )
}

export default Home
