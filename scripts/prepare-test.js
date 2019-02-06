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
        message: 'Selecione um cliente:',
        choices: [ ...clients ]
    });

    await filesystem.removeAsync('./cypress/integration');
    await filesystem.copy(`./test/${client}`, './cypress/integration', { overwrite: true });
})();
