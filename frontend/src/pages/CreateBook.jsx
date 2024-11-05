import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBook = () => {
  const [country, setCountry] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { enqueueSnackbar} = useSnackbar();
  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Create preview URL
  }

  const handleSaveBook = () => {
      // Use FormData to include file
    const data = new FormData();
    data.append('country', country);
    data.append('author', author);
    data.append('publishYear', publishYear);
    if (content) {
      data.append('content', content); // Append the image file if selected
    }
    
    if (image) {
      data.append('image', image); // Append the image file if selected
    }

    setLoading(true);
    axios.post('http://localhost:5555/books', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(()=> {
      setLoading(false);
      enqueueSnackbar('Book Created Successfully', {variant: 'success'});
      navigate('/');
    }
    )
    .catch((error)=>{
      setLoading(false);
      // alert('An error happened');
      enqueueSnackbar('Error', {variant: 'error'})
      console.log(error);
    })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      { loading? <Spinner/>:
      ''
      }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Country</label>
          <input type='text' value={country} onChange={(e)=> setCountry(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text' value={author} onChange={(e)=> setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year of Visit</label>
          <input type='text' value={publishYear} onChange={(e)=> setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Content</label>
          <input type='textarea' value={content} onChange={(e)=> setContent(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' placeholder="Enter your content here..."/>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Upload Image</label>
          <input type='file' onChange={handleImageChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        {imagePreview && (
          <div className="my-4">
            <img src={imagePreview} alt="Selected" className="w-32 h-32 object-cover border-2 border-gray-300 rounded-md" />
          </div>
        )}
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook
