const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the likes of that', () => {

    const listWithMultipleBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })

  test('when list has zero blogs, equals the likes of that', () => {

    const listWithZeroBlogs = []

    const result = listHelper.totalLikes(listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has null blogs, equals the likes of that', () => {

    const listWithNullBlogs = []

    const result = listHelper.totalLikes(listWithNullBlogs)
    expect(result).toBe(0)
  })

})

describe('favorite blog', () => {
  test('when list has multiple blog, equal the most likes of that', () => {
    const listWithMultipleBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 52,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 146,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 256,
        __v: 0
      },
    ]

    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 256,
    }
    expect(result).toEqual(expected)

  })

  test('when list has a single blog, equal the most likes of that', () => {
    const listWithASingleBlog = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 52,
        __v: 0
      }
    ]

    const result = listHelper.favoriteBlog(listWithASingleBlog)
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 52,
    }
    expect(result).toEqual(expected)

  })

  test('when list has zero blogs, equals that', () => {
    const listWithZeroBlogs = []

    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    expect(result).toBe(null)
  })

  describe('most blogs', () => {
    const oneBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 52,
      __v: 0
    }

    const singleBlog = [oneBlog]

    const emptyList = []

    const listWithMultipleBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 52,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 146,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 256,
        __v: 0
      },
    ]

    test('when list is empty should be null', () => {
      expect(listHelper.mostBlogs(emptyList)).toBeNull()
    })

    test('when list has one blog should be that of the author', () => {
      const expected = {
        author: 'Michael Chan',
        blogs: 1
      }

      expect(listHelper.mostBlogs(singleBlog)).toEqual(expected)
    })

    test('when list has multiple blogs should equal to author with most blogs', () => {
      const expected = {
        author: 'Edsger W. Dijkstra',
        blogs: 2
      }

      expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual(expected)
    })

  })

  describe('most likes', () => {
    const oneBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 52,
      __v: 0
    }

    const singleBlog = [oneBlog]

    const emptyList = []

    const listWithMultipleBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 25,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 30,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }
    ]

    test('when a list is empty should be null', () => {
      expect(listHelper.mostLikes(emptyList)).toBeNull()
    })

    test('when list contain one blog should be author of that blog', () => {
      const expected = {
        author: 'Michael Chan',
        likes: 52,
      }

      expect(listHelper.mostLikes(singleBlog)).toEqual(expected)
    })

    test('when a list of multiple blogs should equal author with most likes', () => {
      const expected = {
        author: 'Edsger W. Dijkstra',
        likes: 55
      }

      expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual(expected)
    })
  })
})