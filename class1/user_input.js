// Tipos para input de usuário



// 1) Navegador - usa prompt
// const userName = prompt("Please enter your name:");
// if (userName !== null && userName !== "") {
//     alert("Hello, " + userName + "!");
// } else {
//     alert("No name entered.");
// }



// 2) HTML - usa input e formulários
// <label for="nameInput">Enter your name:</label>
// <input type="text" id="nameInput" placeholder="Your name here">
// <button id="submitButton">Submit</button>
// <p id="outputArea"></p>



// 3) JavaScript - event listeners
// const nameInput = document.getElementById('nameInput');
// const submitButton = document.getElementById('submitButton');
// const outputArea = document.getElementById('outputArea');
// submitButton.addEventListener('click', function() {
//     const userName = nameInput.value;
//     if (userName !== "") {
//         outputArea.textContent = "Hello, " + userName + "!";
//     } else {
//         outputArea.textContent = "Please enter your name.";
//     }
// });
// Pode ser dessa forma também
// import readline from 'node:readline';  
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });




// 4) JavaScript no Node.js - usa require
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// rl.question('What is your name? ', (name) => {
//     console.log(`Hello, ${name}!`);
//     rl.close();
// });