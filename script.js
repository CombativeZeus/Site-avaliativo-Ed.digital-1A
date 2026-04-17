ocument.getElementById('btn-mudar').addEventListener('click', function() {
    const images = document.querySelectorAll('.card img');
    
    images.forEach((img, index) => {
        // Adiciona um parâmetro aleatório para forçar o carregamento de uma nova imagem
        img.src = `https://picsum.photos/300/200?random=${Math.random()}`;
    });

    console.log("Imagens atualizadas com sucesso!");
});
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
