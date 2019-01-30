/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;

describe('Validações de troca de senha', () => { 
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`);

        cy.visit('/#/')

        cy.get('#trocarSenha')
            .click();

        cy.get('#titulo')
            .should('have.text', 'Trocar senha');
    });

    it('Deve testar a validação de campos incorretos', () => {
        trocarSenha('asd', '1', '1');

        cy.get('#mensagem-erro')
            .should('have.text', 'Senha antiga incorreta!')
    });

    it('Deve testar a validação de senhas não correspondentes', () => {
        trocarSenha('asd', '123', 'asd');

        cy.get('#mensagem-erro')
            .should('have.text', 'As senhas não coincidem!');
    });

    it('Deve redefinir a senha com sucesso (e trocar para a senha antiga, para não quebrar os testes)', () => { 
        trocarSenha('123', '1234', '1234');

        cy.get('#mensagem-sucesso')
            .should('have.text', 'Senha alterada com sucesso!');

        trocarSenha('1234', '123', '123');

        cy.get('#mensagem-sucesso')
            .should('have.text', 'Senha alterada com sucesso!');
    });
})

function trocarSenha(senhaAntiga, senhaNova, confirmeSenha) {
    cy.get('#senhaAntiga')
        .clear()
        .type(senhaAntiga);
    
    cy.get('#senhaNova')
        .clear()
        .type(senhaNova);

    cy.get('#confirmarSenha')
        .clear()
        .type(confirmeSenha);

    cy.get('#trocar-senha')
        .click();
}