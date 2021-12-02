/// <reference types="cypress" />
Cypress.Commands.add("addMember",(firstName,lastName,email,phone,sendType,adminType)=>{
    let addMemberLocator = "Add member"
    let firstNameLocator = 'input[placeholder="Enter first name"]'
    let lastNameLocator = 'input[placeholder="Enter last name"]'
    let emailLocator = 'input[placeholder="Enter email"]'
    let phoneLocator = 'input[placeholder="Enter phone number"]'
    let selectAdminLocator = 'input[placeholder="Select role"]'
    let selectAllLocator = '.el-checkbox__input'
    let addButtonLocator = 'div[aria-label="Add Member"]>.el-dialog__footer button'
    let chooseSMSLocator = 'div[aria-label="Add Member"] .switch input[value="2"]'
    cy.contains(addMemberLocator).click()
    cy.get(firstNameLocator).clear().type(firstName)
    cy.get(lastNameLocator).clear().type(lastName)
    cy.get(emailLocator).clear().type(email)
    cy.get(phoneLocator).clear().type(phone)
    cy.wait(6000)
    if(sendType!=1){
        cy.get(chooseSMSLocator).click({force: true})
    }
    if(adminType==1){
        cy.get(selectAdminLocator).click()
        cy.contains('Admin').click()
    }else{
        cy.get(selectAdminLocator).click()
        cy.contains('Operator').click()
    }
    cy.get(selectAllLocator).first().click()
    cy.get(addButtonLocator).click()
})