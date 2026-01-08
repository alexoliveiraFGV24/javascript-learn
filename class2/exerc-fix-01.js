import { sum, subtraction, product, division } from './utils.js';

// Selecionamos a div de resultado
const display = document.getElementById("resultado");


try {
    // Pegando o input do usuário
    const a = +prompt("Digite um número: ");  // Ou Number(prompt(...)) 
    const b = +prompt("Digite outro número: ");

    // Armazenando as variáveis dos cálculos
    const c = sum(a, b);
    const d = subtraction(a, b);
    const e = product(a, b);
    const f = division(a, b);

    // Imprimindo o conteúdo na página HTML
    const resultados = `
        <p>Os números escolhidos foram: <strong>${a}</strong> e <strong>${b}</strong></p>
        <p>A soma é: <strong>${c.toPrecision(3)}</strong></p>
        <p>A subtração é: <strong>${d.toPrecision(3)}</strong></p>
        <p>A multiplicação é: <strong>${e.toPrecision(3)}</strong></p>
        <p>A divisão é: <strong>${f.toPrecision(3)}</strong></p>
    `;
    display.innerHTML = resultados;

// Caso aconteça um erro
} catch (erro) {
    display.innerHTML = `<p style="color: red;">Erro: ${erro.message}</p>`;
}