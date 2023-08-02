const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const loginRouter = require('../controllers/login')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('hemmeligkode', 10)
  const user = new User({ username: 'root', name: 'Superuser', password: passwordHash })

  await user.save()

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  token = jwt.sign(userForToken, process.env.SECRET)

  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('testing all blogs are valid', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})


describe('Adding a single blog and checking id', () => {
  test('identifying field is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Concurrent Mode is Dead. Long live Concurrent…',
      author: 'Michael Chan',
      url: 'https://chan.dev/concurrent-mode-is-dead/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Concurrent Mode is Dead. Long live Concurrent…'
    )
  })
})

describe('Testing if attributes are missing', () => {
  test('If the likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: 'Concurrent Mode is Dead. Long live Concurrent',
      author: 'Michael Chan',
      url: 'https://chan.dev/concurrent-mode-is-dead/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set('Authorization', `Bearer ${token}`)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === 'Concurrent Mode is Dead. Long live Concurrent')
    expect(addedBlog.likes).toBe(0)

  })

  test('if title or url is missing expect 400 bad request', async () => {
    const newBlog = {
      author: 'someone',
      url: 'something@mail.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })
})

describe('Blogs can be deleted and updated', () => {
  test('blogs can be deleted by issuing a HTTP delete with an id', async () => {
    const newBlog = {
      title: 'a title',
      author: 'someone',
      url: 'something.com',
      likes: 2
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)

    const response = await api.get(`/api/blogs/${result.body.id}`)
    const deleteBlog = await api
      .delete(`/api/blogs/${result.body.id}`)

    expect(deleteBlog.status).toBe(204)
  })


  test('blogs can be updated by issuing a HTTP put with an id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = { ...blogsAtStart[0], likes: blogsAtStart[0].likes + 1 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .set('Authorization', `bearer ${token}`)
  })
})

test('blog without a token cannot be added', async () => {
  const newBlog = {
    title: 'a title',
    author: 'someone',
    url: 'something.com',
    likes: 2
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', 'Bearer bad token')

  expect(response.status).toBe(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})