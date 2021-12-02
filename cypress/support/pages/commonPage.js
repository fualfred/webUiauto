/// <reference types="cypress" />
export default class CommonPage{

    constructor(){
        this.url = null
    }
    isTargetPage(){
        cy.url().should('eq',this.url)
    }
}