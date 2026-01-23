function addImage() {
    const lista = document.getElementById("lista");
    const novoItem = document.createElement("li");
    const novaImagem = document.createElement("img");
    const idAleatorio = Math.floor(Math.random() * 1000);
    novaImagem.src = `https://picsum.photos/300/200?random=${idAleatorio}`;
    novaImagem.alt = "Imagem aleatória";

    novoItem.appendChild(novaImagem);
    lista.appendChild(novoItem);
}


function removeImages () {
    if (!confirm('Tem certeza que deseja apagar as imagens?')) {
        return;
    };
    localStorage.removeItem('');
    location.reload();
};

const $ = (sel) => document.querySelector(sel);
$('#btnReset').addEventListener('click', resetarSistema);