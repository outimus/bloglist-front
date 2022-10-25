import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  // userId on localStorageen tallennetun käyttäjän id
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      userId: '634814c80f5618a4d39f0c86',
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>title:  <input
        value={newTitle}
        onChange={handleTitleChange}
        placeholder='write here some content'
      />
      </div>
      <div>author:  <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>url:  <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      </div>
      <p></p>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm