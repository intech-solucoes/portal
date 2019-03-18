/// <reference types="Cypress" />

describe('EsqueciSenha', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#esqueciSenha')
            .click();
    });

    it("Valida CPF e data de nascimento inválidos", () => { 
        enviarNovaSenha("123", "01/01/18");

        cy.get('#alerta-erro')
            .contains("Campo \"Data de Nascimento\" inválido.Campo \"CPF\" inválido.");
    });

    it("Valida CPF e data de nascimento em branco", () => { 
        enviarNovaSenha("", "");

        cy.get('#alerta-erro')
            .contains("Campo \"Data de Nascimento\" inválido.Campo \"CPF\" inválido.");
    });

    // it("Faz requisição de nova senha com sucesso", async () => { 
    //     await enviarNovaSenha("15243362115", "01/03/1957");

    //     cy.location('pathname').should('eq', '/');
    //     console.log("FOI");
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