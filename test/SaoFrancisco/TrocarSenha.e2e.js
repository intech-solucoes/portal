/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;
const logins = Cypress.env('SaoFrancisco');

describe('Validações de troca de senha', () => { 
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`, logins.ativo);

        cy.visit('/#/')

        cy.get('#trocarSenha')
            .click();

        cy.get('#titulos')
            .should('have.text', 'Trocar senha');
    });

    it('Deve testar a validação de campos incorretos', () => {
        trocarSenha('asd', '123456', '123456');

        cy.get('#mensagem-erro')
            .should('have.text', 'Senha antiga incorreta!')
    });

    it('Deve testar a validação de senhas não correspondentes', () => {
        trocarSenha('asd', '123456', 'asdfgh');

        cy.get('#mensagem-erro')
            .should('have.text', 'As senhas não coincidem.');
    });

    it('Deve testar a validação de senhas com menos de 6 caracteres', () => { 
        trocarSenha('123', '123', '123');

        cy.get('#mensagem-erro')
            .should('have.text', 'A nova senha deve possuir no mínimo 6 caracteres.');
    })

    // it('Deve redefinir a senha com sucesso (e trocar para a senha antiga, para não quebrar os testes)', () => { 
    //     trocarSenha('123', '1234', '1234');

    //     cy.get('#mensagem-sucesso')
    //         .should('have.text', 'Senha alterada com sucesso!');

    //     trocarSenha('1234', '123', '123');

    //     cy.get('#mensagem-sucesso')
    //         .should('have.text', 'Senha alterada com sucesso!');
    // });
})

function trocarSenha(senhaAtual, senhaNova, confirmeSenha) {
    cy.get('#senhaAtual')
        .clear()
        .type(senhaAtual);
    
    cy.get('#senhaNova')
        .clear()
        .type(senhaNova);

    cy.get('#confirmarSenha')
        .clear()
        .type(confirmeSenha);

    cy.get('#trocar-senha')
        .click();
}