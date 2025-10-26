// Seletores de elementos importantes
let fundoDestaque = document.querySelector(".fundo-destaque");
let imagemCafe = document.querySelector(".imagem-cafe");
let nomeCafeDestaque = document.querySelector(".nome-cafe-destaque");
let descricaoCafe = document.querySelector(".descricao-cafe");
let valorCafe = document.querySelector(".valor-cafe");
let logo = document.querySelector(".logo"); 
let botaoComprar = document.querySelector(".botao-comprar"); // Seleciona o botão

// ----------------------------------------------------
// NOVO: Função para o botão "PEÇA AGORA"
// ----------------------------------------------------
function fazerPedido() {
    // 1. Pega o nome e o preço do café que está em destaque
    const nome = nomeCafeDestaque.textContent;
    const preco = valorCafe.textContent;

    // 2. Monta a mensagem para o pop-up
    const mensagem = `
        ✅ Seu pedido foi registrado!
        
        Item: ${nome}
        Valor: ${preco}
        
        Agradecemos a preferência!
    `;

    // 3. Exibe o pop-up
    alert(mensagem);
}

// ----------------------------------------------------
// NOVO: Associa a função ao clique do botão
// ----------------------------------------------------
// Adiciona um 'ouvinte' (listener) que espera o clique no botão
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
    
    // 1. Atualiza elementos com novos dados
    imagemCafe.src = novaImagem;
    nomeCafeDestaque.textContent = novoNome;
    descricaoCafe.textContent = novaDescricao;
    valorCafe.textContent = novoValor;
    
    // 2. Atualiza as cores de destaque (Fundo e Elementos de Texto/Botão)
    fundoDestaque.style.backgroundColor = novaCor;
    nomeCafeDestaque.style.color = novaCor;
    valorCafe.style.color = novaCor;
    logo.style.color = novaCor;
    botaoComprar.style.backgroundColor = novaCor;


    // 3. Gerencia o destaque (classe 'ativo') no menu
    
    // Remove a classe 'ativo' de todos os itens
    const itensMenu = document.querySelectorAll('.opcao-item');
    itensMenu.forEach(item => {
        item.classList.remove('ativo');
    });

    // Adiciona a classe 'ativo' ao item clicado
    itemClicado.classList.add('ativo');
}


// EXECUÇÃO INICIAL (Garante que a cor de destaque inicial seja aplicada na carga)
const itemInicial = document.querySelector('.opcao-item.ativo');
if (itemInicial) {
    // A cor inicial do Espresso é '#583a2c'
    const corInicial = '#583a2c'; 
    fundoDestaque.style.backgroundColor = corInicial;
    nomeCafeDestaque.style.color = corInicial;
    valorCafe.style.color = corInicial;
    logo.style.color = corInicial;
    botaoComprar.style.backgroundColor = corInicial;
}