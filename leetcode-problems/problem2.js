/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

    // Definindo as variáveis auxiliares
    let auxiliar = new ListNode(0);  // Pois o número é não negativo
    let atual = auxiliar;
    let sobe = 0;  // Sobe alguma 

    // Percorrendo os números ou se tem algum para subir na soma
    while (l1 !== null || l2 !== null || sobe > 0) {

        // Definindo os valores atuais dos nós
        let valor1 = (l1 === null) ? 0 : l1.val;
        let valor2 = (l2 === null) ? 0 : l2.val;

        // Somando os valores para obter o próximo número
        let soma = valor1 + valor2 + sobe;
        sobe = Math.floor(soma / 10);

        // Criando o novo nó
        atual.next = new ListNode(soma % 10);

        // Avançando os ponteiros
        atual = atual.next;
        if (l1 !== null) {
            l1 = l1.next;
        };
        if (l2 !== null) {
            l2 = l2.next;
        };
    };
    
    return auxiliar.next;
};