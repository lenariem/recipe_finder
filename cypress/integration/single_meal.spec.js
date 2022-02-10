/// <reference types="cypress" />

describe('single meal', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500')

        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata", 
            { fixture: 'oneMeal.json' }).as('getOneMeal')

        cy.get('input').type('arrabiata').should('have.value', 'arrabiata')
        
        cy.get('.search-btn').click()

        cy.wait('@getOneMeal')
    })

    it('searching by meal name', () => {
        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'arrabiata':")

        cy.get('.meal').should('have.length', 1)
    })

    it('should render correct recipe on click', () => {
        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771", 
            { fixture: 'oneMeal.json' }).as('getOneMeal')
        
        cy.get('.meal-info').click()

        cy.wait('@getOneMeal')
        
        cy.get('.single-meal').should('be.visible')
        
        cy.get('.single-meal > h1')
            .should('be.visible')
            .and('have.text', 'Spicy Arrabiata Penne')
        
        cy.get('.single-meal > img')
            .should('be.visible')
            .and('have.attr', 'alt', 'Spicy Arrabiata Penne')
        
        cy.get('.single-meal-info > p')
            .should('be.visible')
            .and('contain', 'Vegetarian')
        
        cy.get('.main').should('be.visible')
        
        cy.get('.main > .steps')
            .should('be.visible')
            .and('contain', 'Bring a large pot of water to a boil')
        
        cy.get('.main > .ingredients').should('be.visible')
        
        cy.get('.main > ul > li')
            .should('be.visible')
            .should('have.length', 8)
            .and('not.be.empty')
    })
})
