import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.clearToken();
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const updateBlog = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog))
    })
  }

  const removeBlog = (blogObject) => {
    blogService.remove(blogObject.id).then(status => {
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
    });
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )



  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App