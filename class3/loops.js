import readline from "node:readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


try {

    let qtdIter = Number(await rl.question("Digite o número de iterações: "))

    for (let i = 0; i < qtdIter; i++) {
        console.log(i);

        /*
        = é atribuição
        == é igualdade (faz a coerção de tipos e compara o valor)
        === é igualdade estrita (valor e tipo devem ser iguais)
        i++ o valor da variável é lida e depois incrementada
        ++i o valor da variável é incrmentada e depois lida
        */
        if (i === qtdIter - 1) {
            console.log(qtdIter);
            console.log("Fim do laço for!")
        };
    };


} catch (erro) {
    console.log(erro.message);
} finally {
    rl.close();
}