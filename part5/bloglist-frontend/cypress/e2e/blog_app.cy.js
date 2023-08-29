describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Bob Dylan',
      username: 'bandit',
      password: 'hemmeligkode'
    }
    const newUser = {
      name: 'Test Testsen',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('user can log in', function() {
    cy.get('#login').click()
    cy.get('#username').type('bandit')
    cy.get('#password').type('hemmeligkode')
    cy.get('#login-button').click()

    cy.contains('Bob Dylan logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#login').click()
    cy.get('#username').type('bandit')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('#error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Bob Dylan logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bandit', password: 'hemmeligkode' })
    })

    it('a new blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('input#title').type('a new blog created by cypress')
      cy.get('input#author').type('cypress')
      cy.get('input#url').type('https://cypres.io')
      cy.get('#createBlogButton').click()
      cy.contains('a new blog created by cypress')
    })

    describe('and several blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'http://firstblog.com' })
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'http://secondblog.com' })
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'http://thirdblog.com' })
      })

      it('one of those can be liked', function() {
        cy.get('#toggleInfo').click()
        cy.get('#likeButton').click()
        cy.contains(1)
      })

      it('user who created a blog can delete it', function() {
        cy.get('#toggleInfo').click()
        cy.contains('Remove').click()
        cy.get('#root').should('not.contain', 'first blog')
      })
    })

    describe('Blogs ordered by number of likes', function() {
      beforeEach(function() {
        cy.login({ username: 'bandit', password: 'hemmeligkode' })
        cy.createBlog({ author: 'John Doe', title: 'test1', url: 'http://example.com./test1' })
        cy.createBlog({ author: 'John Doe', title: 'test2', url: 'http://example.com./test2' })

        cy.contains('test1').parent().parent().as('blog1')
        cy.contains('test2').parent().parent().as('blog2')
      })

      it('they are ordered by number of likes', function() {
        cy.get('@blog1').contains('View').click()
        cy.get('@blog2').contains('View').click()

        cy.get('.blog').eq(0).should('contain', 'test1').contains('Like').click()
        cy.wait(500)
        cy.get('.blog').eq(1).should('contain', 'test2').contains('Like').click()
        cy.wait(500)
        cy.get('.blog').eq(1).should('contain', 'test2').contains('Like').click()
        cy.wait(500)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('2')
          cy.wrap(blogs[1]).contains('1')
        })
      })
    })
  })

  describe('different user has created a blog when another user logs in', function() {
    beforeEach(function() {
      cy.login({ username: 'bandit', password: 'hemmeligkode' })
      cy.createBlog({ title: 'blog created by bandit', author: 'bandit', url: 'https://bandit.org' })
    })

    it('only the creator of a blog can see the remove button', function() {
      cy.login({ username:'test', password: 'test' })
      cy.get('#toggleInfo').click()
      cy.get('#removeButton').should('not.be.visible')
    })
  })

})