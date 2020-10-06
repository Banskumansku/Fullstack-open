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
    if (window.confirm("Do you really want to remove blog?")) {
      event.preventDefault()
      console.log("blogremove")
      removeBlog(blog)
    }
  }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>

        <div>
          {blog.title} {blog.author}
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog