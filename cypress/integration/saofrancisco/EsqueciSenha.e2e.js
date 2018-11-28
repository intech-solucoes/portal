/// <reference types="Cypress" />

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/esqueciSenha');
    });

    it("Valida CPF e data de nascimento inválidos", () => { 
        enviarNovaSenha("123", "01/01/18");

        cy.get('.text-danger')
            .contains("Preencha todos os campos corretamente!");
    });

    it("Valida CPF e data de nascimento em branco", () => { 
        enviarNovaSenha("", "");

        cy.get('.text-danger')
            .contains("Preencha todos os campos!");
    });

    // it("Faz requisição de nova senha com sucesso", () => { 
    //     enviarNovaSenha("", "");

    //     cy.get('#enviarSenha')
    //         .click();

    //     // Fazer algo para checar o alert.

    //     cy.location('pathname').should('eq', '/');
    // });

});

function enviarNovaSenha(cpf, dataNascimento) {
    if(cpf !== "") {
        cy.get("#cpf")
            .clear()
            .type(cpf);
    }

    if(dataNascimento !== "") {
        cy.get("#dataNascimento")
            .clear()
            .type(dataNascimento);
    }

    cy.get("#enviarSenha")
        .click();
}