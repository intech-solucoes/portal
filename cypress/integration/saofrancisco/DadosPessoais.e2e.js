/// <reference types="Cypress" />

describe('Dados Pessoais', () => {
    beforeEach(() => {
        cy.visit('/');

        cy.get("#cpf")
            .clear()
            .type('15243362115');
 
        cy.get("#senha")
            .clear()
            .type('123');

        cy.get("#entrar")
            .click();

        cy.wait(3000);

        cy.get('#dadosPessoais')
            .click();

        cy.wait(3000)
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
