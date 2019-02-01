/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;

describe('Planos' , () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`);

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