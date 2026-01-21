/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0;
    let max = 0;
    const map = {}; // Vamos guardar a última posição de cada letra

    for (let right = 0; right < s.length; right++) {
        let char = s[right];

        // Se a letra já apareceu e está dentro da nossa janela atual (depois de left)
        if (map[char] !== undefined && map[char] >= left) {
            // "Pula" o left para uma posição depois de onde a letra repetida estava
            left = map[char] + 1;
        }

        // Atualiza a posição da letra no map
        map[char] = right;
        
        // Mede a distância entre os ponteiros
        max = Math.max(max, right - left + 1);
    }

    return max;
};


let s = "pwwkew";
console.log(lengthOfLongestSubstring(s));