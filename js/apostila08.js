$(document).ready(function() {
    
    // Variáveis de controle
    const $lightbox = $('#lightbox');
    const $lightboxImg = $('#lightbox-img');
    const $caption = $('.caption');
    const $items = $('.gallery-item');
    let currentIndex = 0;
    let totalItems = $items.length;

    // --- 1. ABRIR LIGHTBOX ---
    $('.gallery-item').click(function() {
        // Pega o índice da imagem clicada
        currentIndex = $(this).data('index');
        
        // Atualiza a imagem do modal
        updateLightboxImage();
        
        // Efeito FadeIn do jQuery (Animação suave)
        $lightbox.css('display', 'flex').animate({
            opacity: 1
        }, 300);
    });

    // --- 2. FECHAR LIGHTBOX ---
    // Fecha ao clicar no X ou fora da imagem
    $('.close-btn, #lightbox').click(function(e) {
        if(e.target !== this) return; // Impede fechar se clicar na imagem ou botões
        
        $lightbox.animate({
            opacity: 0
        }, 300, function() {
            $(this).css('display', 'none');
        });
    });

    // --- 3. NAVEGAÇÃO (Próximo / Anterior) ---
    // Impede que o clique nos botões feche o modal (propagação)
    $('.nav-btn').click(function(e) {
        e.stopPropagation();
    });

    $('.next-btn').click(function() {
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0; // Loop para o início
        }
        updateLightboxImage();
    });

    $('.prev-btn').click(function() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalItems - 1; // Loop para o final
        }
        updateLightboxImage();
    });

    // Função Auxiliar para trocar a imagem
    function updateLightboxImage() {
        // Busca o elemento correspondente ao índice atual
        const $currentItem = $(`.gallery-item[data-index="${currentIndex}"]`);
        const imgSrc = $currentItem.find('img').attr('src');
        const imgAlt = $currentItem.find('img').attr('alt');

        // Efeito simples de troca (hide/fadeIn)
        $lightboxImg.hide().attr('src', imgSrc).fadeIn(200);
        $caption.text(imgAlt);
    }

    // Navegação por Teclado (Bônus de Usabilidade)
    $(document).keydown(function(e) {
        if ($lightbox.is(':visible')) {
            if (e.key === 'ArrowRight') $('.next-btn').click();
            if (e.key === 'ArrowLeft') $('.prev-btn').click();
            if (e.key === 'Escape') $('.close-btn').click();
        }
    });

});