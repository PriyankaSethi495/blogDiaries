import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'

const BooksTable = ({books}) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
      <th className='border border-slate-600 rounded-md text-white'>No</th>
      <th className='border border-slate-600 rounded-md text-white'>Country</th>
      <th className='border border-slate-600 rounded-md max-md:hidden text-white'>Author</th>
      <th className='border border-slate-600 rounded-md max-md:hidden text-white'>Year of Visit</th>
      <th className='border border-slate-600 rounded-md text-white'>Operations</th>
      </tr>
    </thead>
    <tbody>
      {
        books.map((book, index)=>
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-700 tounded-md text-center text-white'>
              {index+1}
            </td>
            <td className='border border-slate-700 tounded-md text-center text-white'>
              {book.country}
            </td>
            <td className='border border-slate-700 tounded-md text-center max-md:hidden text-white'>
              {book.author}
            </td>
            <td className='border border-slate-700 tounded-md text-center max-md:hidden text-white'>
              {book.publishYear}
            </td>
            <td className='border border-slate-700 tounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800'></BsInfoCircle>
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-800'></AiOutlineEdit>
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-800'></MdOutlineDelete>
                </Link>
              </div>
            </td>
          </tr>
        )
      }
    </tbody>
  </table>
  )
}

export default BooksTable
