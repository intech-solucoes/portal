
var diaAtual = new Date().getDate();
var mesAtual = new Date().getMonth();
mesAtual++;    // getMonth() retorna o mês atual entre 0 e 11. Com o incremento o valor fica entre 1 e 12.
var anoAtual = new Date().getFullYear();

/** 
 * @param {Object} dataObjeto - objeto do tipo 'date' com a data a ser verificada.
 * @param {string} dataString - string com a mesma data a ser comparada.
 * @return {boolean} - data válida ou não.
 * @description verificar se a data de nascimento não ultrapassa a data atual e está dentro dos limites.
 */
export default function DataInvalida(dataObjeto, dataString) {
    var dia = dataObjeto.getDate();
    var mes = dataObjeto.getMonth() + 1;
    var ano = dataObjeto.getFullYear();
    
    if(dataString.length < 10)
        return true;

    var dataInvalida = VerificaLimitesData(dataObjeto, dataString);
    if(dataInvalida)
        return true;

    // Verifica se a data é superior à data atual.
    if(ano > anoAtual)
        return true;

    if(ano === anoAtual)
    {
        if(mes > mesAtual)
            return true;
        
        if(mes === mesAtual) {
            if(dia > diaAtual)
                return true;
        }
    }

    return false;
}

/**
 * @param {Object} dataObjeto - objeto do tipo 'date' com a data a ser verificada.
 * @param {string} dataString - string com a mesma data a ser comparada.
 * @return {boolean} - data válida ou não
 * @description Verificar se a data recebida está com os dias, meses e anos dentro do limite.
 */
function VerificaLimitesData(dataObjeto, dataString) {
    var dia = dataObjeto.getDate();
    var mes = dataObjeto.getMonth() + 1;
    var ano = dataObjeto.getFullYear();

    var diaReal = parseInt(dataString.substring(0, 2), 10);
    var mesReal = parseInt(dataString.substring(3, 5), 10);
    var anoReal = parseInt(dataString.substring(6), 10);

    // Verifica se os dias e meses estão dentro dos valores limites (1-30 e 1-12) comparando a data recebida como string (valor fixo) com a data como Objeto (que incrementa valores caso supere os limites).
    if(dia === diaReal && mes === mesReal && ano === anoReal) {
        return false;
    } else {
        return true;
    }
}
