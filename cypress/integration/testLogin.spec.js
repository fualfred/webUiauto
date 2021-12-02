/// <reference types="cypress" />
import loginTestData from "../fixtures/login.json"
describe('登录功能模块测试', () => {
  beforeEach(function(){
    cy.visit('/login')

  });
  context("登录成功测试",function(){
     it("登录成功，跳转到dashboard页面",function(){
        let username = Cypress.config('username')
        let password = Cypress.config('password')
        cy.login(username,password)
        cy.url().should('include', '/dashboard')
     })
  })
   context("登录测试失败",function(){
      loginTestData.forEach((event)=>{
         it(`登录测试失败-账号不存在或者密码错误-${event.username}-${event.password}`,function(){
            cy.login(event.username,event.password)
            cy.url().should('include', '/login')
         }) 
      })
   })
  context("通过Email修改账号密码",function(){
   let username = Cypress.config('username')
   let newPassword ="Aa1234568"
   it("通过Email修改密码成功",function(){
      cy.clearCount('security:verification_mail:cypressTest@test.com:send_count',1)
      cy.forgetPasswordByEmail(username,newPassword)
   })
   it("使用新密码登录",function(){
      cy.login(username,newPassword)
      cy.url().should('include', '/dashboard')
   })
   it("再次修改密码，修改成原始密码",function(){
      let email = Cypress.config('username')
      let newPassword =Cypress.config("password")
      cy.forgetPasswordByEmail(email,newPassword)
   })
   it("再次使用修改后的密码登录",function(){
      let email = Cypress.config('username')
      let Password = Cypress.config('password')
      cy.login(email,Password)
      cy.url().should('include', '/dashboard')
   })
});
context("通过手机号修改账号密码",function(){
   let phone = Cypress.config('phone')
   let newPassword ="Aa1234569"
   let email = Cypress.config("username")
   it("通过Phone修改密码成功",function(){
      cy.clearCount(`security:verification_phone:${phone}:send_count`,1)
      cy.forgetPasswordByPhone(phone,newPassword)
   })
   it("使用新密码登录",function(){
      cy.login(email,newPassword)
      cy.url().should('include', '/dashboard')
   })
   it("再次修改密码，修改成原始密码",function(){
      let newPassword =Cypress.config("password")
      cy.forgetPasswordByPhone(phone,newPassword)
   })
   it("再次使用修改后的密码登录",function(){
      let email = Cypress.config("username")
      let Password =Cypress.config("password")
      cy.login(email,Password)
      cy.url().should('include', '/dashboard')
   })
});
 })