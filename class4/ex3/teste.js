import readline from "node:readline/promises";

// Função para pedir um número inteiro válido
async function numeroInteiroValido(mensagem) {
    while (true) {
        const num = Number(await rl.question(mensagem));
        if (!Number.isNaN(num) && Number.isInteger(num) && num > 0) {
            return num;
        };
        console.log(`\nErro: Você precisa digitar um número inteiro positivo válido!`);
    };
};

// Função para retornar um valor formatado
function formatarNumero (valor, array) {
    if (array.length === 0) {
        return null;
    } else {
        return valor;
    };
};

// Criando a interface para input de teclado
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout 
});

// Definindo as variáveis (você pode mudar Number.MIN_SAFE_INTEGER e Number.MAX_SAFE_INTEGER para -Infinity e Infinity)
const n = await numeroInteiroValido("Digite a quantidade de números: ");
let nums = [];
let pares = [];
let impares = [];
let maior_par = Number.MIN_SAFE_INTEGER;
let maior_impar = Number.MIN_SAFE_INTEGER;
let menor_par = Number.MAX_SAFE_INTEGER;
let menor_impar = Number.MAX_SAFE_INTEGER;

// Pegando os números e separando em pares e ímpares, além de mudar os maiores e menores
for (let i = 0; i < n; i++) {
   const num = await numeroInteiroValido(`Digite o número ${i+1}: `);

   nums.push(num);

   if (num % 2 === 0) {
      pares.push(num);
      if (num < menor_par) {
         menor_par = num;
      };
      if (num > maior_par) {
         maior_par = num;
      };

   } else {
      impares.push(num);
      if (num < menor_impar) {
         menor_impar = num;
      };
      if (num > maior_impar) {
         maior_impar = num;
      };
   };

};

// Fechando a interface de input
rl.close();

// Imprimindo os resultados
console.log("\nNúmeros digitados: " + nums);
console.log("Números pares: " + pares);
console.log("Números ímpares: " + impares);
console.log("Menor par: " + formatarNumero(menor_par, pares));
console.log("Menor ímpar: " + formatarNumero(menor_impar, impares));
console.log("Maior par: " + formatarNumero(maior_par, pares));
console.log("Maior ímpar: " + formatarNumero(maior_impar, impares));