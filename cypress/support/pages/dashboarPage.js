/// <reference types="cypress" />

import CommonPage from "./commonPage"
import TeamsPage from "./teamsPage"
export default class DashboardPage extends CommonPage{
    constructor(){
        super()
        this.url = Cypress.config('baseUrl')+'dashboard'
        this.containsTeamslocator = "Teams"
    }
    isTargetPage(){
        cy.url().should('eq',this.url)
    }
    goToteamsPage(){
        cy.contains(this.containsTeamslocator).click()
        return new TeamsPage()
    }
}