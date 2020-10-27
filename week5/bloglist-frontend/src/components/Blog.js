import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog = (event) => {
    if (window.confirm('Do you really want to remove blog?')) {
      event.preventDefault()
      dispatch(removeBlog(blog))
    }
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        {blog.url}
      </div>
      <div id='likes'>
        likes {blog.likes} <button id='likeBlogButton' onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
      <div>
        <button id='deleteButton' onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog