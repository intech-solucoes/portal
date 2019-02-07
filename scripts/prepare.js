const { print, filesystem, prompt, system, colors } = require('gluegun');

const { spin } = print;

(async () => {

    var dev = false;
    var prod = false;

    // Processa parâmetros passados a CLI
    process.argv
        .filter((arg) => arg.indexOf("--") > -1)
        .forEach((arg) => {
            if(arg === "--dev") dev = true;
            if(arg === "--prod") prod = true;
        });

    // Busca os clientes
    var clientFolders = await filesystem.listAsync("./scripts/configs");
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

    const configs = await filesystem.listAsync(`./scripts/configs/${client}`);
    var envList = [];

    configs
        .filter((config) => config.indexOf("config") > -1)
        .forEach((config) => {
            var splitConfigName = config.split(".");
            envList.push(splitConfigName[1]);
        });
    
    const { env } = await prompt.ask({
        type: 'list',
        name: 'env',
        message: 'Selecione um ambiente:',
        choices: envList
    });

    var configFile = await filesystem.readAsync(`./scripts/configs/${client}/config.${env}.json`);
    configFile = JSON.parse(configFile);
    console.log('\n');
    console.log('O sistema irá apontar para a API publicada em '.green + `${configFile.apiUrl}`.blue);

    if(!await prompt.confirm("Confirmar?"))
        return;

    console.log('\n');

    var spinner = spin({ 
        color: "cyan",
        text: "1/6 Realizando build de estilos..."
    });

    await filesystem.copy(`./src/styles/clientes/variables-${client}.scss`, "./src/styles/variables-cliente.scss", { overwrite: true });
    await filesystem.removeAsync('./public/imagens');
    await filesystem.copy(`./imagens/${client}`, './public/imagens', { overwrite: true });

    await system.run("sass ./src/styles/main.scss:./public/css/main.css");

    spinner.text = "2/6 Copiando configurações...";

    await filesystem.copy(`./scripts/configs/${client}/config.${env}.json`, "./src/config.json", { overwrite: true });

    spinner.stop();

    if(prod || (!dev && await prompt.confirm("Deseja publicar esta versão?")))
    {
        var appFile = await filesystem.readAsync(`./scripts/configs/${client}/app.json`);
        appFile = JSON.parse(appFile);

        const { destino } = await prompt.ask({
            type: 'list',
            name: 'destino',
            message: 'Selecione um destino:',
            choices: Object.keys(appFile.publish)
        });

        spinner = spin({ 
            color: "cyan",
            text: "3/6 Realizando build..."
        });

        await system.run("node scripts/build.js");

        await filesystem.removeAsync(`${appFile.publish[destino]}\\static`);

        spinner.text = "4/6 Limpando pasta css...";
        await filesystem.removeAsync(`${appFile.publish[destino]}\\css`);

        spinner.text = "5/6 Limpando pasta imagens...";
        await filesystem.removeAsync(`${appFile.publish[destino]}\\imagens`);

        spinner.text = "6/6 Copiando arquivos para" + `${appFile.publish[destino]}`.blue + "...";
        await filesystem.copy(`./build`, appFile.publish[destino], { overwrite: true });

        spinner.stop();
    }
})();