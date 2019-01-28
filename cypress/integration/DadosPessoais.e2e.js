/// <reference types="Cypress" />

describe('Dados Pessoais', () => {
    beforeEach(() => {
        cy.login('http://localhost:5000/api/usuario/login', {
            "Cpf": "15243362115", 
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
