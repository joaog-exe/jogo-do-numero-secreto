let listaDeNumerosSorteados = [];
let numeroLimite = 10;
function gerarNumeroAleatorio() {
   let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeNumerosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeNumerosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

   if (listaDeNumerosSorteados.includes(numeroGerado)){
        return gerarNumeroAleatorio();
   } else {
        listaDeNumerosSorteados.push(numeroGerado);
        console.log(listaDeNumerosSorteados);
        return numeroGerado
   }
}

let numeroSecreto = gerarNumeroAleatorio();
console.log (numeroSecreto);

let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log (chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou');
        let palavraTentativas = tentativas > 1 ? 'Tentativas' : 'Tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        } else if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Ainda não');
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('h1', 'Ainda não');
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();

}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}