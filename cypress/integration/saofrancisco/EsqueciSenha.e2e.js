/// <reference types="Cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/esqueciSenha');
    });

    it("Valida CPF e data de nascimento inválidos", () => { 
        enviarNovaSenha(" ", "01/01/18");

        cy.get('.text-danger')
            .contains("Preencha todos os campos corretamente!");
    });

});

function enviarNovaSenha(cpf, dataNascimento) {
    cy.get("#cpf")
        .clear()
        .type(cpf);

    cy.get("#dataNascimento")
        .clear()
        .type(dataNascimento);

    cy.get("#enviarSenha")
        .click();
}