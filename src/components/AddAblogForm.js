const AddAblogForm = (props) => {
    return (
        <form onSubmit={props.handleAddingBlog}>
          <div>title:  <input
              type="text"
              value={props.title}
              name="title"
              onChange={props.handleTitle}
            />
          </div>
          <div>author:  <input
              type="text"
              value={props.author}
              name="author"
              onChange={props.handleAuthor}
            />
          </div>
          <div>url:  <input
              type="text"
              value={props.url}
              name="url"
              onChange={props.handleUrl}
            />
          </div>
          <p></p>
          <button type="submit">create</button>
        </form>
    )
}

export default AddAblogForm