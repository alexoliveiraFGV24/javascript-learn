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

// Função para retornar um valor formatado
function formatarNumero (valor, array) {
    if (array.length === 0) {
        return null;
    } else {
        return valor;
    };
};

// Definindo as variáveis (você pode mudar Number.MIN_SAFE_INTEGER e Number.MAX_SAFE_INTEGER para -Infinity e Infinity)
const n = numeroInteiroValido("Digite a quantidade de números: ");
let nums = [];
let pares = [];
let impares = [];
let maior_par = Number.MIN_SAFE_INTEGER;
let maior_impar = Number.MIN_SAFE_INTEGER;
let menor_par = Number.MAX_SAFE_INTEGER;
let menor_impar = Number.MAX_SAFE_INTEGER;

// Pegando os números e separando em pares e ímpares, além de mudar os maiores e menores
for (let i = 0; i < n; i++) {
    
   const num = numeroInteiroValido(`Digite o número ${i+1}: `);

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

// Imprimindo os resultados
const conteudo = `
    <h3>Resultados</h3>
    <p><strong>Números digitados:</strong> ${nums}</p>
    <hr>
    <p><strong>Pares:</strong> [${pares}]</p>
    <ul>
        <li>Menor par: ${formatarNumero(menor_par, pares)}</li>
        <li>Maior par: ${formatarNumero(maior_par, pares)}</li>
    </ul>
    <p><strong>Ímpares:</strong> [${impares}]</p>
    <ul>
        <li>Menor ímpar: ${formatarNumero(menor_impar)}</li>
        <li>Maior ímpar: ${formatarNumero(maior_impar)}</li>
    </ul>
`;
display.innerHTML = conteudo;