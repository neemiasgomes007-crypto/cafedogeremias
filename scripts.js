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

/* ------------------ PARTICULAS LEVES (fundo) ------------------ */
(function(){
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0, particles = [];

    function resize(){
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function createParticle(){
        return {
            x: rand(0, W),
            y: H + rand(0, 200),
            vx: rand(-0.2, 0.2),
            vy: rand(0.3, 1.1),
            size: rand(6, 18),
            rot: rand(0, Math.PI * 2),
            vrota: rand(-0.02, 0.02),
            alpha: rand(0.18, 0.7)
        };
    }

    // quantidade adaptativa (menos em mobile)
    const baseCount = window.innerWidth < 600 ? 28 : 60;
    for (let i = 0; i < baseCount; i++) particles.push(createParticle());

    function drawBean(p){
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.6);
        ctx.beginPath();
        // desenha uma elipse que lembra um grão de café
        ctx.ellipse(0, 0, p.size, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,58,44,${p.alpha})`;
        ctx.fill();
        // leve brilho
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.06, p.alpha * 0.06)})`;
        ctx.beginPath();
        ctx.ellipse(-p.size * 0.3, -p.size * 0.2, p.size * 0.5, p.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function step(){
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < particles.length; i++){
            const p = particles[i];
            p.x += p.vx;
            p.y -= p.vy; // sobe
            p.rot += p.vrota;

            // leve oscilação horizontal
            p.vx += Math.sin((p.y + i) * 0.001) * 0.0008;

            if (p.y < -60 || p.x < -80 || p.x > W + 80){
                particles[i] = createParticle();
                particles[i].y = H + rand(0, 120);
            }
            drawBean(particles[i]);
        }
        requestAnimationFrame(step);
    }

    // reduz frequência em background/aba não ativa para poupar CPU
    document.addEventListener('visibilitychange', function(){
        if (document.hidden){
            // pause animation by stopping RAFs indirectly (browser handles it) - keep simple
        }
    });

    step();
})();