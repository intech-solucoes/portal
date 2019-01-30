/// <reference types="Cypress" />

const configs = require('../support/config-test.json');
const cpf = configs.Cpf;
const senha = configs.Senha;

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
            .should("have.text", "Matrícula ou senha incorretos!");
    });

    it("Faz login com sucesso", () => {
        doLogin(cpf, senha);

        // cy.wait(3000);  // Trocar para um alias.

        // cy.get("#titulos")
        //     .should("have.text", "Home");    // Comentando pois o título da Home ainda não está definido;
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