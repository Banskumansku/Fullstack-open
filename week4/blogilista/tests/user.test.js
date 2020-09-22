const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const differentUsers = [
    {
        username: "mikko",
        name: "mikko",
        password: "mokkinen"
    },
    {
        username: "mi",
        name: "mikko",
        password: "mokkinen"
    },
    {
        username: "mikko",
        name: "mikko",
        password: "mo"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
})
describe('user things', () => {
    test('user with proper creds gets made', async () => {
        const newUser = differentUsers[0]
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/users')
    
        expect(response.body.length).toEqual(1)
    })

    test('user with bad username does not get made', async () => {
        const newUser = differentUsers[1]
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
    
        expect(response.body.length).toEqual(0)
    })

    test('user with bad password does not get made', async () => {
        const newUser = differentUsers[2]
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
    
        expect(response.body.length).toEqual(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})