const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const { author, title, likes } = blogs.reduce((mostLikedBlog, currentBlog) => {
    if (currentBlog.likes > mostLikedBlog.likes) {
      return currentBlog
    } else {
      return mostLikedBlog
    }
  }, blogs[0])

  const result = { author, title, likes }
  return result
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(Object.keys(blogsByAuthor), author => blogsByAuthor[author].length)

  if (!authorWithMostBlogs) return null

  return {
    author: authorWithMostBlogs,
    blogs: blogsByAuthor[authorWithMostBlogs].length
  }
}

const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) return null

  const authorLikes = _.groupBy(blogs, 'author')
  const result = _.maxBy(_.map(authorLikes, (blogs, author) => ({
    author,
    likes: _.sumBy(blogs, 'likes')
  })), 'likes')

  return {
    author: result.author,
    likes: result.likes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}