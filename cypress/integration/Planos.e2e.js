describe('Planos' , () => {
    beforeEach(() => {
        cy.login('http://localhost/PrevesApi/api/usuario/login', {
            "Cpf": "15243362115", 
            "Senha": "123"
        });

        cy.visit('/#/');

        cy.get('#planos')
            .click();

        cy.wait(3000);
    })

    it('Deve checar se há pelo menos um plano', () => {
        cy.get('#tabelaPlanos')
            .find('tbody')
            .find('tr')
            .should('have.length', 1);
        
    })
})