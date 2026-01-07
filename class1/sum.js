// Não tem doctype, pois JS é de tipagem dinâmica
/**
 * Soma dois números
 * @param {number} a 
 * @param {number} b 
 */
function sum(a, b) {
    return a + b;
}

// Input do usuário e definição das variáveis
// Tome cuidado, esse prompt só funciona nos navegadores
// const a = +prompt("Digite um número: "); // Esse + transforma em número (equivalente a Number(prompt("Digite um número: "));)
// const b = +prompt("Digite outro número: "); 
// const c = sum(a, b);


// Usamos o módulo nativo 'readline' para ler a entrada do teclado
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

/* 
Quando usamos readline, ele executa tudo que está entre os parênteses
Imediatamente, ele pula para a próxima linha, fechando o canal de comunicação com o teclado
*/
// Fazendo a pergunta ao usuário no terminal
readline.question('Digite o primeiro número: ', (num1) => {
  readline.question('Digite o segundo número: ', (num2) => {
    
    // Atribuíndo
    const a = Number(num1);
    const b = Number(num2);
    
    // Printando
    console.log(`A soma de ${a} + ${b} é: ${sum(a, b)}`);

    // Fecha a interface de leitura
    readline.close(); 
  });
});