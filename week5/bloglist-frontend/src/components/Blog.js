import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const deleteBlog = (event) => {
    if (window.confirm('Do you really want to remove blog?')) {
      event.preventDefault()
      removeBlog(blog)
    }
  }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button id='showBlog' onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>
          {blog.title} {blog.author}
          <button id='hideBlog' onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div id='likes'>
          likes {blog.likes} <button id='likeBlogButton' onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button id='deleteButton' onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog