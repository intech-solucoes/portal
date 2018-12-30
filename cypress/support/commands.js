// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

/**
 * @description Faz login programaticamente pela rota e objeto de login recebido e define o token no navegador (não utilizar para testar tela de login).
 * @param {string} rota - Rota que será chamada para o login.
 * @param {object} loginObject - Objeto com os atributos necessários e específicos para login (Ex.: Cpf e senha, e-mail e senha).
 */
Cypress.Commands.add("login", (rota, loginObject) => { 
    cy.visit('/');

    cy.request('POST', rota, loginObject)
        .then((resp) => {
            expect(resp.status).to.eq(200);
            localStorage.setItem('token', resp.body.AccessToken);
    }).as('login');
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
