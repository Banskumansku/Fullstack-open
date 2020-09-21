
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const _ = require('lodash');


blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({
            error: 'number or name missing'
        })
    }
    if (!request.body.likes) {
        _.assign(request.body, { likes: 0 })
    }
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })

})

blogRouter.put('/:id', (request, response) => {
    console.log(request.body)
    const blog = request.body
    console.log(blog)
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(updatedBlog => {
        response.json(updatedBlog)
    }).catch(error => console.log(error))
})

blogRouter.delete('/:id', (request, response) => {
    Blog.findByIdAndRemove(request.params.id).then(_result => {
        response.status(204).end()
    }).catch(error => console.log(error))
})

module.exports = blogRouter
