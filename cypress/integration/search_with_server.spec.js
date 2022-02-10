/// <reference types="cypress" />

describe('search function works correct with server', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500')
    })

    it('searching by key word', () => {
        cy.get('input')
            .type('chicken')
            .should('have.value', 'chicken')

        cy.get('.search-btn').click()

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'chicken':")

        cy.get('.meal').should('have.length', 25)
    })

    it('searching by meal name', () => {
        cy.get('input')
            .type('tonkatsu pork')
            .should('have.value', 'tonkatsu pork')

        cy.get('.search-btn').click()

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'tonkatsu pork':")

        cy.get('.meal').should('have.length', 1)

        cy.get('.meal-info > h3').contains('tonkatsu pork', { matchCase: false })
    })

    it('search for not existing in DB recipe', () => {
        cy.get('input')
            .type('chicken napolitano')

        cy.get('.search-btn').click()

        cy.get('.meal-info').should('not.exist')

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "There are no search results for 'chicken napolitano'. Try again!")
    })

    it('search with error: more than 50 chars', () => {
        cy.get('input')
            .type('ZioSPppSgEH1fYMLlELb0j45zLH0aH4Z5ri4eVTnpCSRUHZHcqb')

        cy.get('.search-btn').click()

        cy.get('.meal-info').should('not.exist')

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "There are no search results for 'ZioSPppSgEH1fYMLlELb0j45zLH0aH4Z5ri4eVTnpCSRUHZHcq'. Try again!")
    })
})