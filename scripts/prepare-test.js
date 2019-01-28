const { filesystem, prompt } = require('gluegun');

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

    // var configTest = {
    //     ApiUrl: apiUrl
    // }

    // configTest = JSON.stringify(configTest);
    // console.log(configTest);
    // filesystem.write('/src/config-test.json', configTest);  // de alguma forma, substituir o conteudo no json pelo novo OU criar um arquivo e colar lá com as novas configs com o filesyste.copy
})();
