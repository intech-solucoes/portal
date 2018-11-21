/// <reference types="Cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it("Valida credenciais inválidas", () => {
        doLogin("asd", "123");

        cy.get(".alert")
            .should("have.text", "E-mail ou senha incorretos!");
    });

    it("Faz login com sucesso", () => {
        doLogin("", "123");

        cy.get(".page-title")
            .should("have.text", "Home");
    });
});

function doLogin(email, password) {
    cy.get("#email")
        .clear()
        .type(email);

    cy.get("#password")
        .clear()
        .type(password);

    cy.get("#submit")
        .click();
}