/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;
const logins = Cypress.env('SaoFrancisco');

describe('Planos' , () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`, logins.ativo);

        cy.visit('/#/');

        cy.get('#planos')
            .click();

        cy.wait(3000);
    })

    it('Deve checar se há pelo menos um plano', () => {
        cy.get('#tabelaPlanos')
            .find('tbody')
            .find('tr')
            .should('have.length', 1);
        
    })
})