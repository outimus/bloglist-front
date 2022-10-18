import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  // userId on localStorageen talletetun käyttäjän id
  const handleAddingBlog = (event) => {
    event.preventDefault()
    console.log("USER",user)
    blogService.create({ "title": title, "author": author, "url": url, "userId": "634814c80f5618a4d39f0c86"})
    setNotification(`A new blog by author ${author} was added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <ErrorNotification message={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      )
    }
    
    return (
      <div>
        <h2>blogs</h2>
        <SuccessNotification message={notification} />
          <p>{user.name} logged in<button onClick={handleRemove}>logout</button></p>
        <h2>create new</h2>
        <form onSubmit={handleAddingBlog}>
          <div>title:<input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>author:<input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>url:<input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <p></p>
          <button type="submit">create</button>
        <p></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </form>
      </div>
    )}

export default App
