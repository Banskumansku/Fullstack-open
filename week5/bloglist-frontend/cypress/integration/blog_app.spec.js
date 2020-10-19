const { func } = require("prop-types")

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'test user',
            username: 'test',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Login')
    })
    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('test user logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Login')
        })
    })
    describe.only('When logged in', function () {
        beforeEach(function () {
            // log in user here
            cy.login({ username: 'test', password: 'salainen' })
        })

        it('A blog can be created', function () {
            cy.get('#show').click()
            cy.get('#title').type('testTitle')
            cy.get('#author').type('testAuthor')
            cy.get('#url').type('testUrl')
            cy.get('#blogSubmitButton').click()
            cy.contains('testTitle')
        })

        describe.only('When logged in and created blog', function () {
            beforeEach(function () {
                cy.createBlog({
                    author: 'testAuthor',
                    title: 'blogTitle',
                    url: 'testUrl'
                })
            })
            it('A blog can be liked', function () {
                cy.get('#showBlog').click()
                cy.get('#likeBlogButton').click()
                cy.get('#likes').should('contain', '1')
            })
            it('A blog can be deleted', function () {
                cy.get('#showBlog').click()
                cy.get('#deleteButton').click()
                cy.get('testTitle').should('not.exist')
            })
        })
    })
})