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
 */
Cypress.Commands.add("login", (rota, cpf) => { 
    cy.visit('/');

    const login = {
        Cpf: cpf,
        Senha: "123"
    }

    cy.request('POST', rota, login)
        .then((resp) => {
            expect(resp.status).to.eq(200);
            localStorage.setItem('token', resp.body.AccessToken);
    });

    // cy.request('GET', 'http://localhost:5000/api/funcionario')  // Colocar auth nisso aqui.22
    //     .then((resp) => {
    //         console.log(resp);
    //     });
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
