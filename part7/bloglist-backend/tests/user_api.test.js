const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('hemmeligkode', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'elsborg',
      name: 'Martin Elsborg',
      password: 'hemmeligkode',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails when username already exists', async () => {

  const newUser = {
    username: 'elsborg',
    name: 'Martin Elsborg',
    password: 'hemmeligkode'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('creation fails if password is missing', async () => {
  const newUser = {
    username: 'johndoe',
    name: 'John Doe',
    password: ''
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('creation fails if password is too short', async () => {
  const newUser = {
    username: 'johndoe',
    name: 'John Doe',
    password: 'ab'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})