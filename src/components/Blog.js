import Togglable from './Togglable'
import axios from 'axios'
const baseUrl = '/api/blogs'

const handleLike = (props) => {
  const blogId = props.blog.id
  const updatedInfo = {
    user: props.blog.user.id,
    title: props.blog.title,
    author: props.blog.author,
    url: props.blog.url,
    likes: props.blog.likes + 1
  }
  const request = axios.put(baseUrl + "/" + blogId, updatedInfo)
  return request.then(response => response.data)
}

const handleRemove = (props) => {
  const blogId = props.blog.id
  window.confirm(`Are you sure you want to remove ${props.blog.title} by author ${props.blog.author}?`)
  axios.delete(baseUrl + "/" + blogId)
}

const RemoveButton = (props) => {
  const loggedUser = props.user.name
  const blogByUser = props.blog.user.name
  
  if (loggedUser === blogByUser) {
    return (
      <button onClick={() => handleRemove(props.blog)}> remove </button>
    )}
  }

const Blog = ({blog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <Togglable buttonLabel='view'>
          <p>{blog.url}</p>
          <>likes {blog.likes} <button onClick={() => handleLike(blog={blog})}> like </button></>
          <p></p>
          <RemoveButton blog={blog} user={user}/>
        </Togglable>
      </div>
    </div>
  )}


export default Blog