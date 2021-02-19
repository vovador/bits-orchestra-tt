import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom'
import { post } from '../api';
import { patch } from '../api';

interface TodoFormProps {
  title?: string,
  author?: string,
  category?: string,
  isbnNumber?: string,
  id?: string
}

export const AddBook: React.FC<TodoFormProps> = (props) => {

  const [title, setTitle] = useState(props ? props.title : '');
  const [author, setAuthor] = useState(props ? props.author : '');
  const [category, setCategory] = useState(props ? props.category : '');
  const [isbnNumber, setIsbnNumber] = useState(props ? props.isbnNumber: '');
  const history = useHistory()

  
const onInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

const onInputAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value)
  }

const onSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setCategory(event.target.value)
}

const onNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
  setIsbnNumber(event.target.value)
}

const submitHandler = (event: any) => {
  event.preventDefault()

  const newBook = {
    title: title,
    author: author,
    category: category,
    isbn: isbnNumber
  }

  let spacesIndecator: boolean = false

  Object.values(newBook).forEach(item => {
    if(item?.trim().length === 0) {
      alert('Input can not contain spaces exclusively!')
      setTitle('');
      setAuthor('');
      setCategory('');
      setIsbnNumber('');
      spacesIndecator = true;
    }
  })

  if(spacesIndecator) {
    return;
  }

  if(Object.keys(props).length === 0) {
 
  
    post('/books', newBook);
    setTitle('');
    setAuthor('');
    setCategory('');
    setIsbnNumber('');
  }else {
    patch(`/books/${props.id}`, newBook);
    alert('The book info was suc')

    history.push('/')
  
    
  }
}

  return (
    <form
    className="custom-form"
    onSubmit={submitHandler}
    >
      <label className="custom-label" htmlFor="title">Title of the book</label>
      <input
        id="title"
        required
        type="text"
        value={title}
        onChange={onInputTitle}
        className="new-todo"
        placeholder="Title of your book"
      />
      <label className="custom-label" htmlFor="author">Author of the book</label>
      <input
        id="author"
        required
        type="text"
        value={author}
        onChange={onInputAuthor}
        className="new-todo"
        placeholder="Author of your book"
      />
      <br />
      <label className="custom-label" htmlFor="category">Category of the book</label>
        <select
        id="categoty"
        required
        className="browser-default"
        value={category}
        onChange={onSelectCategory}
      >
        <option value="">
          Select a category
        </option>
        <option value="funny">
          funny
        </option>
        <option value="horror">
          horror
        </option>
        <option value="fantasy">
          fantasy
        </option>
        <option value="detective">
          detective
        </option>
      </select>
      <label className="custom-label" htmlFor="isbn">ISBN</label>
      <input
        id="isbn"
        required
        value={isbnNumber}
        onChange={onNumber}
        type="number"
        placeholder="Please enter exclusively a number value"
        min="0"
      />
      <button
        className="btn"
        type="submit"
      >
        Add a book
      </button>
    </form>
  )
}