// Seletores de elementos importantes
let fundoDestaque = document.querySelector(".fundo-destaque");
let imagemCafe = document.querySelector(".imagem-cafe");
let nomeCafeDestaque = document.querySelector(".nome-cafe-destaque");
let descricaoCafe = document.querySelector(".descricao-cafe");
let valorCafe = document.querySelector(".valor-cafe");
let logo = document.querySelector(".logo"); 
let botaoComprar = document.querySelector(".botao-comprar"); 

// ====================================================
// CRÍTICO: Seletores e Controle da Tela de Loading
// ====================================================
let splashScreen = document.querySelector(".splash-screen");

window.addEventListener('load', () => {
    // Esconde a splash screen após 3 segundos
    setTimeout(() => {
        splashScreen.classList.add('hidden'); // Esconde a tela de logo
        // Não é mais necessário o body.style.opacity = '1'
    }, 3000); 
});

// ----------------------------------------------------
// Função para o botão "PEÇA AGORA"
// ----------------------------------------------------
function fazerPedido() {
    const nome = nomeCafeDestaque.textContent;
    const preco = valorCafe.textContent;

    const mensagem = `
        ✅ Seu pedido de ${nome} foi registrado!
        
        Valor: ${preco}
        
        Agradecemos a preferência!
    `;

    alert(mensagem);
}

// Associa a função ao clique do botão
botaoComprar.addEventListener('click', fazerPedido);


/**
 * Função unificada para mudar o café em destaque
 * @param {string} novaImagem - Caminho da nova imagem principal.
 * @param {string} novoNome - Novo nome do café.
 * @param {string} novaDescricao - Nova descrição/sinopse.
 * @param {string} novaCor - A cor em formato hexadecimal para o destaque.
 * @param {string} novoValor - O preço do café.
 * @param {HTMLElement} itemClicado - O elemento do menu que foi clicado.
 */
function mudarCafe(novaImagem, novoNome, novaDescricao, novaCor, novoValor, itemClicado) {
    
    imagemCafe.src = novaImagem;
    nomeCafeDestaque.textContent = novoNome;
    descricaoCafe.textContent = novaDescricao;
    valorCafe.textContent = novoValor;
    
    fundoDestaque.style.backgroundColor = novaCor;
    nomeCafeDestaque.style.color = novaCor;
    valorCafe.style.color = novaCor;
    logo.style.color = novaCor;
    botaoComprar.style.backgroundColor = novaCor;

    const itensMenu = document.querySelectorAll('.opcao-item');
    itensMenu.forEach(item => {
        item.classList.remove('ativo');
    });

    itemClicado.classList.add('ativo');
}


// EXECUÇÃO INICIAL (Garante que a cor de destaque inicial seja aplicada na carga)
const itemInicial = document.querySelector('.opcao-item.ativo');
if (itemInicial) {
    const corInicial = '#583a2c'; 
    fundoDestaque.style.backgroundColor = corInicial;
    nomeCafeDestaque.style.color = corInicial;
    valorCafe.style.color = corInicial;
    logo.style.color = corInicial;
    botaoComprar.style.backgroundColor = corInicial;
}