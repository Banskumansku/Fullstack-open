import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogurl] = useState('')
    const [blogTitle, setBlogTitle] = useState('')

    const handleTitleBlogChange = (event) => setBlogTitle(event.target.value)
    const handleAuthorBlogChange = (event) => setBlogAuthor(event.target.value)
    const handleurlBlogChange = (event) => setBlogurl(event.target.value)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <h1>create new</h1>
                <div>title:
          <input
                        title={blogTitle}
                        onChange={handleTitleBlogChange}
                    />
                </div>
                <div>author:
          <input
                        title={blogAuthor}
                        onChange={handleAuthorBlogChange}
                    />
                </div>
                <div>url:
          <input
                        title={blogUrl}
                        onChange={handleurlBlogChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm