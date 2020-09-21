const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('the first blog is about go-to-statements', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Go To Statement Considered Harmful')
})

test('blogs can be added', async () => {
    const newBlog = {
        title: "Java good",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toEqual(3)
})

test('expect id to be defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('no like field means 0 likes', async () => {
    const newBlog = {
        title: "Java good",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toEqual(0)
})

test('no title or url field means 400 code', async () => {
    const newBlog = {
        title: "Java good",
        author: "Michael Chan"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})