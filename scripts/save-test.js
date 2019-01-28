const { filesystem, prompt } = require('gluegun');

(async () => {
    
    // Busca os clientes
    var clientFolders = await filesystem.listAsync("./test");
    var clients = [];
    clientFolders.forEach((client) => {
        clients.push(client);
    });

    const { client } = await prompt.ask({
        type: 'list',
        name: 'client',
        message: 'Selecione o cliente que deseja salvar os testes.',
        choices: [ ...clients ]
    });

    if(!await prompt.confirm(`ATENÇÃO: Os testes de /integration irão sobreescrever o conteúdo do diretório ${client} em /test. Confirmar?`))
        return;

    await filesystem.removeAsync(`./tests/${client}`);
    await filesystem.copy(`./cypress/integration`, `./test/${client}`, { overwrite: true });

})();
