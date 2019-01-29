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

    const { cpf } = await prompt.ask({
        name: 'cpf',
        message: 'Informe o CPF que será utilizado para os testes:',
    });

    const { password } = await prompt.ask({
        name: 'password',
        message: 'Informe a senha:',
    });

    var configTest = {
        Cpf: cpf,
        Senha: password
    }

    configTest = JSON.stringify(configTest, null, 4);
    await filesystem.removeAsync('./cypress/support/config-test.json');

    await filesystem.write('./cypress/support/config-test.json', configTest);
})();
