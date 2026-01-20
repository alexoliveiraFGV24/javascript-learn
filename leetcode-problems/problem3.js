/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0;
    let max = 0;
    const mapa = {}; // Vamos guardar a última posição de cada letra

    for (let r = 0; r < s.length; r++) {
        let char = s[r];

        // Se a letra já apareceu E está dentro da nossa janela atual (depois de l)
        if (mapa[char] !== undefined && mapa[char] >= l) {
            // "Pula" o l para uma posição depois de onde a letra repetida estava
            l = mapa[char] + 1;
        }

        // Atualiza a posição da letra no mapa
        mapa[char] = r;
        
        // Mede a distância entre os ponteiros
        max = Math.max(max, r - l + 1);
    }

    return max;
};

let s = "pwwkew";
console.log(lengthOfLongestSubstring(s));