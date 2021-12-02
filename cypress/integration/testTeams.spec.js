/// <reference types="cypress" />
import DashboardPage from "../support/pages/dashboarPage"
describe("Teams功能模块测试",()=>{
   before(() => {
      cy.visit("/login")
      let username = Cypress.config("testUsername")
      let password = Cypress.config("testPassword")
      cy.login(username,password)
      cy.wait(1000)
    });
     context("跳转到TeamsPage测试",function(){
      
        it("跳转到TeamsPage测试",function(){
         let teamsPage=new DashboardPage().goToteamsPage()
          teamsPage.isTargetPage()
          cy.getPagecreateText().should('have.text',"Add member")
      })
       it("创建管理员账号正常流程-Email方式",function(){
          let firstname = "aad"
          let lastname = "adaf"
          let email="aa@test.com"
          let phone = "2011211232"
          cy.addMember(firstname,lastname,email,phone,1,1)
       })
       it("创建管理员账号正常流程-SMS方式",function(){
         let firstname = "aad"
         let lastname = "adaf"
         let email="aa@test.com"
         let phone = "2011211232"
         cy.addMember(firstname,lastname,email,phone,2,1)
      })
      it("创建操作员账号正常流程-Email方式",function(){
         let firstname = "aad"
         let lastname = "adaf"
         let email="aa@test.com"
         let phone = "2011211232"
         cy.addMember(firstname,lastname,email,phone,2,1)
      })
      it("创建操作员账号正常流程-SMS方式",function(){
         let firstname = "aad"
         let lastname = "adaf"
         let email="aa@test.com"
         let phone = "2011211232"
         cy.addMember(firstname,lastname,email,phone,2,1)
      })
     })

})
