/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;

describe('Dados Pessoais', () => {
    beforeEach(() => {
        console.log(ApiUrl);
        cy.login(`${ApiUrl}/usuario/login`, {
            "Cpf": "12178513727", 
            "Senha": "123"
        });

        cy.visit('/#/');

        cy.get('#dadosPessoais')
            .click();

        cy.wait(3000);
    });

    it('Deve navegar para a tela e checar se há dados', () => {
        cy.get("#titulo")
            .should('have.text', 'Dados Pessoais');

        for(var i = 0; i <= 23; i++) {
            cy.get(`#${i}`)
                .children().should('have.length.greaterThan', -1);
        }
    })

});
