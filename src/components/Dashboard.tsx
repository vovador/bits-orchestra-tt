import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {request} from '../api';
import {remove} from '../api'

export const Dashboard: React.FC = () => {

  const [bookList, setBookList] = useState<any[]>([])

  useEffect(() => {
    request('/books').then(gotten => setBookList(gotten));
    
  }, [bookList])


  if(bookList.length === 0) {
    return (
      <p className="center">
        No books added
      </p>
    )
  }

  return (
    <>
    <table className="custom-table centered responsive-table">
      <thead className="center-text">
      <tr>
        <td className="center-text">Book title</td>
        <td className="center-text">Author name</td>
        <td className="center-text">Category</td>
        <td className="center-text">ISBN</td>
        <td className="center-text">Actions</td>
     </tr>
      </thead>
      <tbody>
        {bookList.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.isbn}</td>
            <td><Link
              to={
                  { 
                    pathname: '/edit-book',
                    state: {
                             title: book.title,
                             author: book.author,
                             category: book.category,
                             isbn: book.isbn,
                             id: book.id
                            }
                  }
                }
                >
                  <button className="btn mr5px">
                    Edit
                  </button>
                </Link>
            
            <button className="btn" onClick={() => {
              remove(`/books/${book.id}`)
            }}>Delete</button></td>
            </tr>
        ))}

      </tbody>
</table>
    </>
  )
}