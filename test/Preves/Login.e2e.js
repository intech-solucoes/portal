/// <reference types="Cypress" />

const cpf = Cypress.env('Preves').ativo;
const senha = '123';

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Navega para tela de primeiro acesso", () => { 
        cy.get('#esqueciSenha')
            .click();

        cy.location('hash').should('eq', '#/esqueciSenha');
    });

    it("Valida credenciais inválidas", () => {
        doLogin("asd", "123");

        cy.get("#alerta")
            .should("have.text", "CPF ou senha incorretos!")

        doLogin(cpf, "asdf");

        cy.get("#alerta")
            .should("have.text", "CPF ou senha incorretos!")
    });

    it("Faz login com sucesso", () => {
        doLogin(cpf, senha);

        cy.wait(3000);  // Trocar para um alias.

        cy.get("#titulo")
            .should("have.text", "Home");    // Ficar de olho nessa linha pois o título da Home pode mudar.
    });
});

function doLogin(cpf, senha) {
    cy.get('#cpf')
        .clear()
        .type(cpf);

    cy.get('#senha')
        .clear()
        .type(senha);

    cy.get('#entrar')
        .click();
}