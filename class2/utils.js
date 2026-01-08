// Função que calcula a soma entre dois números
export function sum (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a + b;
}

// Função que calcula a subtração entre dois números
export function subtraction (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a - b;
}

// Função que calcula a multiplicação entre dois números
export function product (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    return a * b;
}

// Função que calcula a divisão entre dois números
export function division (a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Entrada inválida! Você precisa digitar números.");
    }

    if (b === 0) {
        throw new Error("Divisão por 0.");
    }

    return a / b;
}