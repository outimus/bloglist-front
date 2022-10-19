import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddAblogForm from './components/AddAblogForm'

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

  const addAblogFormRef = useRef()

  const addAblogForm = () => (
    <Togglable buttonLabel='new blog' ref={addAblogFormRef}>
      <AddAblogForm createBlog={handleAddingBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Login to application</h2>
        <ErrorNotification message={notification} />
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      )
    }
    
    return (
      <div>
        <h2>blogs</h2>
        <h2>create new</h2>
        <SuccessNotification message={notification} />
          <p>{user.name} logged in  <button onClick={handleRemove}>logout</button></p>
            <Togglable buttonLabel='new blog'>
              <AddAblogForm
                title={title}
                author={author}
                handleTitle={({ target }) => setTitle(target.value)}
                handleAuthor={({ target }) => setAuthor(target.value)}
                handleUrl={({ target }) => setUrl(target.value)}
                handleAddingBlog={handleAddingBlog}
                />
            </Togglable>
        <p></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        
      </div>
    )}

export default App
