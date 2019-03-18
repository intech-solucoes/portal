/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;
const logins = Cypress.env('SaoFrancisco');

describe('Dados Pessoais', () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`, logins.ativo);

        cy.visit('/#/');

        // cy.wait(5000);
        cy.get('#dadosPessoais')
            .click();
        cy.wait(3000);
    });

    it('Deve navegar para a tela e checar se há dados', () => {
        cy.get("#titulos")
            .should('have.text', 'Seus Dados');

        for(var i = 0; i <= 22; i++) {  // Alterar isso aqui quando os ajustes na tela de Dados forem feitos.
            cy.get(`#${i}`)
                .children().should('have.length.greaterThan', -1);
        }
    })

});
