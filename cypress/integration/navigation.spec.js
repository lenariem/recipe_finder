/// <reference types="cypress" />

describe('navigation in app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5500')
    })

    it('should render a random recipe on click and back home', () => {
        cy.get('#random').click()
       
        cy.get('.single-meal')
            .should('be.visible')
            .and('not.be.empty')

        cy.get('#home').click()

        cy.get('.meal-info').should('not.exist')
            
        cy.get('input').should('have.value', '')
    })

    it('back home after search', () => {
        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/search.php?s=*", 
            { fixture: 'foundMeals.json' }).as('getMeals')

        cy.get('input').type('beef')
           
        cy.get('.search-btn').click()

        cy.wait('@getMeals')

        cy.get('#result-heading')
            .should('be.visible')
            .and('have.text', "Search results for 'beef':")

        cy.get('.meal').should('have.length', 17)

        cy.get('#home').click()

        cy.get('.meal-info').should('not.exist')
        
        cy.get('input').should('have.value', '')
    })

    it('back home from opened recipe', () => {
        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/search.php?s=arrabiata", 
            { fixture: 'oneMeal.json' }).as('getOneMeal')

        cy.get('input').type('arrabiata').should('have.value', 'arrabiata')
        
        cy.get('.search-btn').click()

        cy.wait('@getOneMeal')

        cy.intercept(
            "GET",
            "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771", 
            { fixture: 'oneMeal.json' }).as('getOneMeal')
        
        cy.get('.meal-info').click()

        cy.wait('@getOneMeal')
        
        cy.get('.single-meal').should('be.visible')

        cy.get('#home').click()

        cy.get('.meal-info').should('not.exist')
        
        cy.get('input').should('have.value', '')
    })
})