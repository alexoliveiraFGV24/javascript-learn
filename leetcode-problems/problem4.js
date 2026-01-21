/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let n = s.length;
    if (n < 2) {
        return s;
    } 

    // Cria matriz n x n preenchida com false
    let dp = Array.from({ length: n }, () => Array(n).fill(false));
    let start = 0;
    let maxLength = 1;

    // 1. Todas as letras individuais são palíndromos
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    // 2. Checar comprimentos de 2 até n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1; // Fim da substring

            if (s[i] === s[j]) {
                // Se o tamanho for 2, só precisa das letras iguais
                // Se for > 2, o "miolo" (dp[i+1][j-1]) precisa ser true
                if (len === 2 || dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    
                    if (len > maxLength) {
                        start = i;
                        maxLength = len;
                    }
                }
            }
        }
    }

    return s.substring(start, start + maxLength);
};


s = "babad"
console.log(longestPalindrome(s));