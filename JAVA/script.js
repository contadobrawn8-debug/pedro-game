let pontos = 0;
let pontosPorClique = 1;
let pontosPorSegundo = 0;
let precoClick = 25;
let ranking = JSON.parse(localStorage.getItem('rankingPedro')) || [];

// Sons e Displays
const som = document.getElementById('somMoeda');
const displayPontos = document.getElementById('pontos');
const displayPoderClique = document.getElementById('poderClique');
const displayPoderAuto = document.getElementById('poderAuto');

function atualizarInterface() {
    displayPontos.innerText = Math.floor(pontos);
    displayPoderClique.innerText = pontosPorClique;
    displayPoderAuto.innerText = pontosPorSegundo;

    // Atualiza botões da loja
    document.getElementById('btnClick').innerText = `🔥 Super Clique (Custa ${precoClick}) +1 por clique`;
    document.getElementById('btnClick').disabled = pontos < precoClick;
    document.getElementById('btn1').disabled = pontos < 50;
    document.getElementById('btn2').disabled = pontos < 200;
    document.getElementById('btn3').disabled = pontos < 1000;
}

function clicar() {
    pontos += pontosPorClique;
    
    // Tocar som
    som.currentTime = 0;
    som.play().catch(() => {}); 
    
    atualizarInterface();
}

function comprarUpgrade(tipo) {
    if (tipo === 'click' && pontos >= precoClick) {
        pontos -= precoClick;
        pontosPorClique += 1;
        precoClick = Math.floor(precoClick * 1.5); // Preço aumenta
    } else if (tipo === 'ajudante' && pontos >= 50) {
        pontos -= 50;
        pontosPorSegundo += 1;
    } else if (tipo === 'robo' && pontos >= 200) {
        pontos -= 200;
        pontosPorSegundo += 5;
    } else if (tipo === 'fazenda' && pontos >= 1000) {
        pontos -= 1000;
        pontosPorSegundo += 20;
    }
    atualizarInterface();
}

function salvarRanking() {
    const nome = document.getElementById('nomeJogador').value;
    if (!nome) return alert("Digite seu nome!");

    ranking.push({ nome: nome, pontos: Math.floor(pontos) });
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 5);

    localStorage.setItem('rankingPedro', JSON.stringify(ranking));
    desenharRanking();
}

function desenharRanking() {
    const lista = document.getElementById('listaRanking');
    lista.innerHTML = ranking.map(item => `<tr><td>${item.nome}</td><td>${item.pontos}</td></tr>`).join('');
}

// Loop de pontos por segundo
setInterval(() => {
    if (pontosPorSegundo > 0) {
        pontos += pontosPorSegundo;
        atualizarInterface();
    }
}, 1000);

// Iniciar
desenharRanking();
atualizarInterface();