import fs from "node:fs";
import csv from "csv-parser";

/**
 * Lê um arquivo CSV e executa uma ação para cada linha (row)
 * @param {string} fileName - Caminho do arquivo
 * @param {Function} processAction - O que fazer com o objeto lido
 */
export async function ReadCSV(fileName, processAction) {
    return new Promise((resolve, reject) => {

        // Verificação simples se o arquivo existe
        if (!fs.existsSync(fileName)) {
            console.log(`Arquivo ${fileName} não encontrado!`);
            return resolve(); 
        }

        // Depois da validação, vamos ler cada linha e depois criar objetos
        fs.createReadStream(fileName)
            .pipe(csv())
            .on('data', (row) => {
                try {
                    // Executa a lógica de criação que passarmos por argumento
                    processAction(row);
                } catch (err) {
                    console.error(`Erro ao processar linha: ${err.message}`);
                }
            })
            .on('end', () => {
                console.log(`Arquivo ${fileName} processado com sucesso!`);
                resolve();
            })
            .on('error', (err) => {
                console.error(`Erro crítico na leitura do arquivo: ${err.message}`);
                reject(err);
            });
    });
};