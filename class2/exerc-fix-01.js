// Função que calcula a soma entre dois números
function sum (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a + b;
}

// Função que calcula a subtração entre dois números
function subtraction (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a - b;
}

// Função que calcula a multiplicação entre dois números
function product (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a * b;
}

// Função que calcula a divisão entre dois números
function division (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a / b;
}

try {
    // Pegando o input do usuário
    const a = +prompt("Digite um número: ");  // Ou Number(prompt(...)) 
    const b = +prompt("Digite outro número: ");

    // Armazenando as variáveis dos cálculos
    const c = sum(a, b);
    const d = subtraction(a, b);
    const e = product(a, b);
    const f = division(a, b);

    // Imprimindo os resultados no navegador (aproximação em 3 casas decimais por conta da mantissa do computador) (se quiser pode retirar)
    document.write(`<p>Os números escolhidos foram: <strong>${a}</strong> e <strong>${b}</strong></p>`)
    document.write(`<p>A soma é: <strong>${c.toPrecision(3)}</strong></p>`);
    document.write(`<p>A subtração é: <strong>${d.toPrecision(3)}</strong></p>`);
    document.write(`<p>A multiplicação é: <strong>${e.toPrecision(3)}</strong></p>`);
    document.write(`<p>A divisão é: <strong>${f.toPrecision(3)}</strong></p>`);

// Caso ocorro algum erro
} catch (erro) {
    document.write(`<p style="color: red;">Erro: ${erro.message}</p>`);
}