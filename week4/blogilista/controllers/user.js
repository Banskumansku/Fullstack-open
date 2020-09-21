const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    User
    .find({})
    .then(users => {
        response.json(users)
    })
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password || body.password.length() < 4) {
        return response.status(400).json({
            error: 'username or password needs to be at least 3 characters long'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter