/// <reference types="cypress" />

describe("Home page rendering correct", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500')
    })

    it('main heading is correct', () => {
        cy.get('h1')
            .should('be.visible')
            .and('have.text', 'Recipe Finder')
    })

    it('search input rendering', () => {
        cy.get('input')
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Search for meals or keywords')
    })

    it('rendering buttons', () => {
        cy.get('.search-btn').should('be.visible')
        cy.get('#random').should('be.visible')
        cy.get('#home').should('be.visible')
    })

    it('search should be empty at the beginning', () => {
        cy.get('.meal-info').should('not.exist')
    })
})