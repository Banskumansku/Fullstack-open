
const blogRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const _ = require('lodash');
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const body = request.body;
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (!body.title || !body.url) {
        return response.status(400).json({
            error: 'number or name missing'
        })
    }
    if (!body.likes) {
        _.assign(body, { likes: 0 })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        user: user._id,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save();
    response.json(savedBlog);
})

blogRouter.put('/:id', (request, response, next) => {
    const blog = request.body
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(updatedBlog => {
        response.json(updatedBlog.toJSON())
    }).catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(401).json({
            error: 'Unauthorized deletion'
        })
    }

    Blog.findByIdAndRemove(request.params.id).then(_result => {
        response.status(204).end()
    }).catch(error => next(error))
})

module.exports = blogRouter
