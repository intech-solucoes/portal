/// <reference types="Cypress" />

const ApiUrl = require('../../src/config.json').apiUrl;

describe('Mensagens', () => {
    beforeEach(() => {
        cy.login(`${ApiUrl}/usuario/login`);

        localStorage.setItem("admin", "S");
        localStorage.setItem("empresa", "0002");
        localStorage.setItem("fundacao", "01");

        cy.visit('/#/');

        cy.get('#mensagens')
            .click();

        cy.wait(3000);
    });

    // it('Deve checar o painel de alerta do caso de não ter mensagens enviadas.', () => {
    //     cy.get('#alertMensagem')
    //         .should('have.text', 'Nenhuma mensagem enviada.');
    // });

    it('Deve criar uma mensagem nova', () => {
        cy.get('#titulo')
            .should('have.text', 'Mensagens');
            
        cy.get('#novaMensagem')
            .click();

        cy.wait(3000);
        cy.get('#titulo')
            .should('have.text', 'Nova Mensagem');

        var tituloMensagem = 'Mensagem Teste';
        var mensagem = 'Mensagem gerada pelo teste automatizado 3.';
        var enviarEmail = false;
        var enviarPortal = true;
        var dataExpiracao = new Date();
        dataExpiracao.setDate(dataExpiracao.getDate() + 1);
        dataExpiracao = dataFormatada(dataExpiracao);
        var fundacao = '01';
        var empresa = '0002';
        var plano = '0001';
        var situacaoPlano = '01';
        var matricula = '000001015';

        preencherCamposMensagem(tituloMensagem, mensagem, enviarEmail, enviarPortal, dataExpiracao, fundacao, empresa, plano, 
                                situacaoPlano, matricula);

        cy.get('#enviar')
            .click();

        cy.wait(3000);

        cy.get('tr').eq('-1').find('button')
            .click();

        var dataCriacao = dataFormatada(new Date());
        var textoFundacao = 'FUNDAÇÃO SÃO FRANCISCO DE SEGURIDADE SOCIAL';
        var textoEmpresa = 'FUNDAÇÃO SÃO FRANCISCO DE SEGURIDADE SOCIAL';
        var textoPlano = 'BENEFICIO DEFINIDO';
        var textoSituacaoPlano = 'ATIVO';
        verificarDadosMensagem(tituloMensagem, dataCriacao, textoFundacao, textoEmpresa, textoPlano, textoSituacaoPlano, matricula, enviarEmail, enviarPortal, mensagem);
    });

    it('Não deve criar uma mensagem nova, com erros de campos obrigatórios e inválidos.', () => { 
        cy.get('#titulo')
            .should('have.text', 'Mensagens');

        cy.get('#novaMensagem')
            .click();

        cy.wait(3000);
        cy.get('#titulo')
            .should('have.text', 'Nova Mensagem');

        preencherCamposMensagem('', '', false, false, '', '', '', '', '', '123');
        
        cy.get('#enviar')
            .click();

        cy.get('#tituloVazio')
            .should('have.text', 'Campo Obrigatório!');
        
        cy.get('#mensagemVazia')
            .should('have.text', 'Campo Obrigatório!');

        cy.get('#enviarViaVazio')
            .should('have.text', 'Selecione ao menos uma opção!');

        cy.get('#fundacaoVazia')
            .should('have.text', 'Selecione a fundação!');

        cy.get('#matriculaInvalida')
            .should('have.text', 'Matrícula Inválida!');
    })
})

function preencherCamposMensagem(titulo, mensagem, enviarEmail, enviarPortal, dataExpiracao, fundacao, empresa, plano, situacaoPlano, matricula) {
    if(titulo !== "")
    cy.get('#tituloMensagem')
        .clear()
        .type(titulo);
    
    if(mensagem !== "")
    cy.get('#mensagem')
        .clear()
        .type(mensagem);

    if(enviarEmail) {
        cy.get('#enviarEmail')
            .check();
    }

    if(enviarPortal) {
        cy.get('#enviarPortal')
            .check();
    }

    if(dataExpiracao !== "")
    cy.get('#dataExpiracao')
        .clear()
        .type(dataExpiracao);

    cy.get('#fundacao')
        .select(fundacao);

    cy.get('#empresa')
        .select(empresa);

    cy.get('#plano')
        .select(plano);

    cy.get('#situacaoPlano')
        .select(situacaoPlano);

    if(matricula !== "")
    cy.get('#matricula')
        .clear()
        .type(matricula);
}

function verificarDadosMensagem(titulo, dataCriacao, fundacao, empresa, plano, situacaoPlano, matricula, enviarEmail, enviarPortal, mensagem) {
    cy.get('#tituloModal')
        .should('have.text', titulo);

    cy.get('#dataCriacaoModal')
        .should('have.text', dataCriacao);

    cy.get('#fundacaoModal')
        .should('have.text', fundacao);

    cy.get('#empresaModal')
        .should('have.text', empresa);

    cy.get('#planoModal')
        .should('have.text', plano);

    cy.get('#situacaoPlanoModal')
        .should('have.text', situacaoPlano);

    cy.get('#matriculaModal')
        .should('have.text', matricula);

    if(enviarEmail)
        cy.get('#badgeE-mail')
            .should('have.text', 'E-mail')
            .should('have.class', 'badge-danger');

    if(enviarPortal)
        cy.get('#badgePortal')
            .should('have.text', 'Portal')
            .should('have.class', 'badge-success');

    cy.get('#mensagemModal')
        .should('have.text', mensagem);
}

function dataFormatada(data) {
    var dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+ dia : dia,
        mes  = (data.getMonth() + 1).toString(), // +1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}
