/// <reference types="cypress" />

import commonPage from "./commonPage"

export default class TeamsPage extends commonPage{
    constructor(){
        super()
        this.url = Cypress.config('baseUrl')+'users'
    }
    isTargetPage(){
        cy.url().should('eq',this.url)
    }
}