import React, {useEffect} from 'react';
import {AddBook} from '../components/AddBook'

type state = {
  state: {
    title: string,
    author: string,
    category: string,
    isbn: string,
    id: string
  }
}

interface EditBookProps {
  location: state
}

export const EditBookPage: React.FC<EditBookProps> = (props) => {
  
  useEffect(() => {
    console.log(props.location.state.title);
    
  })

  return (
    <>
    <h1 className="custom-header">Edit the book info</h1>
    <AddBook
      title={props.location.state.title}
      author={props.location.state.author}
      category={props.location.state.category}
      isbnNumber={props.location.state.isbn}
      id={props.location.state.id}
    />
    </>
  )
}