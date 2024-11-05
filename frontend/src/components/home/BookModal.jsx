import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full max-h-[80vh] bg-white rounded-xl p-4 flex flex-col relative overflow-hidden"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg text-white">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        
        {/* Content wrapper with scroll */}
        <div className="flex-grow overflow-y-auto">
          <div className="flex justify-start items-center gap-x-2">
            <MdLocationOn className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.country}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
          {/* Image container */}
          <div className="flex justify-center items-center my-4">
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={`${book.country} cover`}
                className="w-[80%] h-auto object-contain rounded-lg"
              />
            )}
          </div>
          <p className="mt-4">{book.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
