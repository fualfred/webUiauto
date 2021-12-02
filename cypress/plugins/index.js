/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const fs = require('fs-extra')
const path = require('path')


const Redis =require('ioredis') 
const mysql = require("mysql")
const Redisconfig= require('../config/redis.json')
const mysqlOption = require("../config/mysql.json")
let host=Redisconfig.host
let port =Redisconfig.port
let password=Redisconfig.password


module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = {
    outputRoot: config.projectRoot + '/cypress/logs/',
    printLogsToFile:"always",
    printLogsToConsole:"always",
    outputTarget: {
      'out.txt': 'txt',
      'out.json': 'json',
    }
  };
  require('cypress-terminal-report/src/installLogsPrinter')(on, options);
  
  on('task',{
    getKey(key){
      return new Promise((resolve, reject) => {
        const redis = new Redis({
          host:host,
          port:port,
          password:password,
          db:0
        })
        redis.get(key, (error, results) => {
        if (error) {
          return reject(error)
        }
        redis.quit()
        return resolve(results)
      })
    })
    },
    setKey({key,value}){
      const redis = new Redis({
        host:host,
        port:port,
        password:password,
        db:0
      })
      try {
        return redis.set(key,value)
      } catch (error) {
        cy.log(err)
        return null
      }
    },
    queryMysql({sql,params}){
      let  connection = mysql.createConnection(option);
       connection.connect()
       return new Promise((resolve,reject)=>{
         connection.query(sql,params,(err,result)=>{
             if(err){
               connection.end()
               return reject(err)
             }else{
               connection.end()
               return resolve(result)
             }
         })
       })
    }
  })
  const allureWriter = require('@shelex/cypress-allure-plugin/writer');
  // import allureWriter from "@shelex/cypress-allure-plugin/writer";
  allureWriter(on, config);
  return config;
}
