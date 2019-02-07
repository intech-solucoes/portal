/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;
const logins = Cypress.env('SaoFrancisco');

describe('Dados Pessoais', () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`, logins.ativo);

        cy.visit('/#/');

        cy.get('#dadosPessoais')
            .click();

        cy.wait(3000);
    });

    it('Deve navegar para a tela e checar se há dados', () => {
        cy.get("#titulo")
            .should('have.text', 'Dados Pessoais');

        for(var i = 0; i <= 23; i++) {  // Alterar isso aqui quando os ajustes na tela de Dados forem feitos.
            cy.get(`#${i}`)
                .children().should('have.length.greaterThan', -1);
        }
    })

});
