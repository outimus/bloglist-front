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
})

