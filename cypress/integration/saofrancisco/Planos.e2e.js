describe('Planos' , () => {
    beforeEach(() => {
        cy.login('http://localhost:5000/api/usuario/login', {
            "Cpf": "15243362115", 
            "Senha": "123"
        });

        cy.visit('/#/');

        cy.get('#planos')
            .click();
    })

    it('Deve checar se há pelo menos um plano', () => {
        cy.get('#').find('tr').should('have.length', 4) // wip
        
    })
})