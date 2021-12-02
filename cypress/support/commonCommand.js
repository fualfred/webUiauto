/// <reference types="cypress" />
Cypress.Commands.add('clearCount',(key,value)=>{
    cy.task('setKey',{key,value})
})
Cypress.Commands.add("getPagecreateText",()=>{
    let creatButtonSpanLocator = '.main>div>div>button>span'
    return cy.get(creatButtonSpanLocator)
})