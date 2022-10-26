describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'mikki hiiri',
      username: 'mhhh',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    cy.contains('Login to application')
    cy.contains('login').click
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      it('fails with wrong credentials', function() {
        cy.contains('login').click()
        cy.get('#username').type('mhhh')
        cy.get('#password').type('123456')
        cy.get('#login-button').click()
        cy.contains('mikki hiiri logged in')
      })
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mhhh')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'mhhh', password: '123456' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Uusi hyvä blogi')
      cy.get('#author').type('Tekijä')
      cy.get('#url').type('www.sivusto.fi')
      cy.contains('create').click()
      cy.contains('Uusi hyvä blogi')
    })
  })
})


