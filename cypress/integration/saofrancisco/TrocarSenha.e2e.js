describe('Validações de troca de senha', () => { 
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

        cy.get('#trocarSenha')
            .click();

        cy.get('#titulo')
            .should('have.text', 'Trocar senha');
    });

    // it('Deve testar a validação de campos incorretos', () => {
    //     trocarSenha('asd', '1', '1');

    //     cy.get('.text-danger')
    //         .should('contain', 'Senha antiga incorreta!');
    // });

    // it('Deve testar a validação de senhas não correspondentes', () => {
    //     trocarSenha('asd', '123', 'asd');

    //     cy.get('.text-danger')
    //         .should('contain', 'As senhas não coincidem!');
    // })

    it('Deve redefinir a senha com sucesso', () => { 

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