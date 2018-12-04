const { print, filesystem, prompt, system, strings } = require('gluegun');
const execa = require("execa");

const { spin } = print;

(async () => {

    const { client } = await prompt.ask(
        {
            type: 'list',
            name: 'client',
            message: 'Selecione um cliente:',
            choices: [
                "regius",
                "preves",
                "saofrancisco"
            ]
        }
    );
    
    const configs = await filesystem.listAsync("./scripts/configs");
    var envList = [];

    configs.forEach((config) => {
        var splitConfigName = config.split(".");

        if(splitConfigName[1] == client)
            envList.push(splitConfigName[2]);
    });
    
    const { env } = await prompt.ask(
        {
            type: 'list',
            name: 'env',
            message: 'Selecione um ambiente:',
            choices: envList
        }
    );

    const spinner = spin({ 
        color: "cyan",
        text: "1/2 Building styles..."
    });

    await filesystem.copy(`./src/styles/clientes/variables-${client}.scss`, "./src/styles/variables-cliente.scss", { overwrite: true });

    await system.run("sass -t compressed ./src/styles/main.scss ./public/css/main.css");

    spinner.text = "2/2 Building config...";

    await filesystem.copy(`./scripts/configs/config.${client}.${env}.json`, "./src/config.json", { overwrite: true });

    spinner.stop();
})();