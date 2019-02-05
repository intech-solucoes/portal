/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;

describe('Dados Pessoais', () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`);

        cy.visit('/#/');

        cy.get('#contracheque')
            .click();

        cy.wait(25000);  // Por algum motivo essa busca tá demorando muito. Assim que um alias for feito, esse wait irá esperar o tempo exato da busca para prosseguir.
    });

    it('Deve acessar os dados de um contracheque, caso exista.', () => {
        cy
            .get('#semContracheque').contains('Nenhum contracheque disponível para este plano.')
            .catch((err) => {
                console.error(err);
                cy.get('#tabelaContracheque')
                    .find('tbody')
                    .find('tr')
                    .should('have.length.greaterThan', 0)
            })
            .then(console.log("FOI"));  // Foi não, ainda tá quebrado isso aqui...
    });

});
