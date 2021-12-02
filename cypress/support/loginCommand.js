/// <reference types="cypress" />

Cypress.Commands.add('login',(email,password)=>{
    let usernameLocator ='input[placeholder=Email]'
    let passwordLocator ='input[placeholder=Password]'
    let formLocator ="Log in"
    cy.get(usernameLocator).clear().type(email)
    cy.get(passwordLocator).clear().type(password)
    cy.contains(formLocator).click()
})
Cypress.Commands.add('forgetPasswordByEmail',(email,newPassword)=>{
    let forgetLocator = "Forget password"
    let inputEmailLocator = 'input[placeholder*="@email.com"]'
    let sendEmailLocator = 'Send Email' 
    let codeInputLocator = 'div[role="dialog"]>.el-dialog__body>div:nth-child(2) input'
    let verifyLocator = 'Verify'
    let inputPasswordLocator='input[placeholder="Set new password"]'
    let inputNewPasswordLocator ='input[placeholder="Re-enter new password"]'
    let changeLocator = 'Change Password'
    let okLocator = 'OK'
    cy.contains(forgetLocator).click()
    cy.get(inputEmailLocator).clear().type(email)
    cy.contains(sendEmailLocator).click()
    cy.wait(1000)
    let key = "security:verification_mail:" + email + ":vcode"
    
    cy.task('getKey',key).then(function(value){
        let code = value
        cy.log(code)
        let code_str = code.toString()
        let code_array=code_str.split("")
        let len =code_array.length
        for(let i=0;i<len;i++){
            cy.wait(1000)
            cy.get(codeInputLocator).eq(i).clear().type(code_array[i])
        }
        cy.wait(1000)
        cy.contains(verifyLocator).click()
        cy.get(inputPasswordLocator).clear().type(newPassword)
        cy.get(inputNewPasswordLocator).clear().type(newPassword)
        cy.contains(changeLocator).click()
        cy.contains(okLocator).click()
    }) 
})
Cypress.Commands.add('forgetPasswordByPhone',(phone,newPassword)=>{
    let forgetLocator = "Forget password"
    let SMSLocator = "SMS"
    let inputPhoneLocator = 'input[placeholder*="(999)999-9999"]'
    let sendSMSLocator = 'Send SMS' 
    let codeInputLocator = 'div[role="dialog"]>.el-dialog__body>div:nth-child(2) input'
    let verifyLocator = 'Verify'
    let inputPasswordLocator='input[placeholder="Set new password"]'
    let inputNewPasswordLocator ='input[placeholder="Re-enter new password"]'
    let changeLocator = 'Change Password'
    let okLocator = 'OK'
    cy.contains(forgetLocator).click()
    cy.contains(SMSLocator).click()
    cy.get(inputPhoneLocator).clear().type(phone)
    cy.contains(sendSMSLocator).click()
    cy.wait(1000)
    let key = "security:verification_phone:" + phone + ":vcode"
    
    cy.task('getKey',key).then(function(value){
        let code = value
        cy.log(code)
        let code_str = code.toString()
        let code_array=code_str.split("")
        let len =code_array.length
        for(let i=0;i<len;i++){
            cy.wait(1000)
            cy.get(codeInputLocator).eq(i).clear().type(code_array[i])
        }
        cy.wait(1000)
        cy.contains(verifyLocator).click()
        cy.get(inputPasswordLocator).clear().type(newPassword)
        cy.get(inputNewPasswordLocator).clear().type(newPassword)
        cy.contains(changeLocator).click()
        cy.contains(okLocator).click()
    }) 
})