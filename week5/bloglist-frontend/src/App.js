import React, { useEffect } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { userInStorage, logout } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import BlogList from './components/BlogList'
import AccountList from './components/UserList'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom"
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()


  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(userInStorage())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const users = useSelector(state => state.accounts)
  const blogs = useSelector(state => state.blogList)


  const accountMatch = useRouteMatch('/users/:id')
  const account = accountMatch ? users.find(user => user.id === accountMatch.params.id) : null
  const blogMatch = useRouteMatch('/blogs/:id')
  console.log(blogMatch)
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null



  return (
    <div>
      {!user ?
        <LoginForm /> :
        <div>
          <div>
            <h2>blogs</h2>
            <Notification />
            <p>{user.name} logged in <button onClick={() => dispatch(logout)}>logout</button></p>
          </div>
          <Switch>
            <Route path="/users/:id">
              <User user={account} />
            </Route>
            <Route path="/users">
              <h2>Users</h2>
              <AccountList />
            </Route>
            <Route path="/blogs/:id">
              <Blog blog={blog}/>
            </Route>
            <Route path="/">
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <BlogList />
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App