const { print, filesystem, prompt, system, colors } = require('gluegun');

const { spin } = print;

const apiUrl = require('../src/config.json').apiUrl;

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

    const tests = await filesystem.listAsync(`./test/${client}`);
    await filesystem.removeAsync('./cypress/integration');
    await filesystem.copy(`./test/${client}`, './cypress/integration', { overwrite: true });

    var configTest = {
        ApiUrl: apiUrl
    }
    console.log("1", configTest);
    configTest = JSON.stringify(configTest);
    console.log("2", configTest);
    filesystem.
})();
