// Definindo o display para imprimir os resultados
const display = document.getElementById("resultado");

// Função para pedir um número inteiro válido
function numeroInteiroValido(mensagem) {
    while (true) {

        // Input do usuário
        const input = prompt(mensagem);
        const num = Number(input);

        // Validação
        if (input !== null && input !== "" && !Number.isNaN(num) && Number.isInteger(num) && num > 0) {
            return num;
        }
        
        // Exibe erro temporário se quiser, mas o prompt abrirá novamente
        alert("Erro: Você precisa digitar um número inteiro positivo válido!");
        };
};

// Definindo as variáveis
const n = numeroInteiroValido("Digite a quantidade de números: ");
let nums = Array(n);
let pares = Array(n);
let impares = Array(n);

// Pegando os números e separando em pares e ímpares, além de mudar os maiores e menores
for (let i = 0; i < n; i++) {
   const num = numeroInteiroValido(`Digite o número ${i+1}: `);
   nums[i] = num;
};

let par_inx = 0;
let impar_inx = 0;

for (let i = 0; i < n; i++) {
   if (nums[i] % 2 === 0) {
      pares[par_inx] = nums[i];
        par_inx += 1;
   } else {
        impares[impar_inx] = nums[i];
        impar_inx += 1;
   };
};

// Imprimindo os resultados
const conteudo = `
    <h3>Resultados</h3>
    <p><strong>Números digitados:</strong> ${nums}</p>
    <p><strong>Pares:</strong> [${pares}]</p>
    <p><strong>Ímpares:</strong> [${impares}]</p>
`;
display.innerHTML = conteudo;