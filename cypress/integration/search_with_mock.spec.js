/// <reference types="cypress" />

describe('search function works correct with mock', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500')

        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/search.php?s=*", 
            { fixture: 'foundMeals.json' }).as('getMeals')
    })

    it('searching by key word', () => {
        cy.get('input').type('beef')
           
        cy.get('.search-btn').click()

        cy.wait('@getMeals')

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'beef':")

        cy.get('.meal').should('have.length', 17)
    })

    it('searching by category', () => {
        cy.get('input').type('lamb')
           
        cy.get('.search-btn').click()

        cy.wait('@getMeals')

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'lamb':")

        cy.get('.meal').should('have.length', 17)
    })
})