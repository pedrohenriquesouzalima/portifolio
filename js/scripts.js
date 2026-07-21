let swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let header = document.getElementById('header')

window.addEventListener('scroll', () => {
  if (window.scrollY >= 200) {
    header.style.background = '#191919'
  } else {
    header.style.background = 'transparent'
  }

})



const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_m7mz6dg';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });// 1. ENCAPSULAMENTO: Espera todo o HTML carregar antes de rodar o script.
// Isso impede que variáveis vazem para o escopo global.
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // INICIALIZAÇÃO DO SWIPER
  // ==========================================
  // Dica de Ouro: Adicionei "breakpoints" para tornar o carrossel responsivo!
  // No mobile ele mostra 1 card, no tablet 2, no desktop 3.
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // Padrão Mobile-First
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });


  // ==========================================
  // LÓGICA DO HEADER (ALTA PERFORMANCE)
  // ==========================================
  const header = document.getElementById('header');
  
  // Variável de controle para o debounce do scroll
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    // Só executa se o navegador estiver pronto para renderizar o próximo quadro
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        // Toggle (liga/desliga) a classe invés de injetar CSS inline
        header.classList.toggle('header-scrolled', window.scrollY >= 50);
        isScrolling = false;
      });
      isScrolling = true;
    }
  });


  // ==========================================
  // FORMULÁRIO EMAILJS (MELHORIA DE UX)
  // ==========================================
  const form = document.getElementById('form');
  const btn = document.getElementById('button');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Guarda o texto original e bloqueia o botão para evitar duplos cliques
      const originalBtnText = btn.value;
      btn.value = 'Enviando...';
      btn.disabled = true; 
      btn.style.cursor = 'not-allowed';

      const serviceID = 'default_service';
      const templateID = 'template_m7mz6dg';

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          // UX Moderna: Feedback visual sem usar o alert() que trava a tela
          btn.value = 'Mensagem Enviada!';
          btn.style.backgroundColor = '#28a745'; // Fica verde indicando sucesso
          form.reset(); // Limpa os campos do formulário

          // Restaura o botão original após 3 segundos
          setTimeout(() => {
            btn.value = originalBtnText;
            btn.style.backgroundColor = ''; 
            btn.disabled = false;
            btn.style.cursor = 'pointer';
          }, 3000);

        }, (err) => {
          // UX em caso de erro
          btn.value = 'Erro ao enviar';
          btn.style.backgroundColor = '#dc3545'; // Fica vermelho indicando erro
          console.error('Erro no EmailJS:', err); // Log para o desenvolvedor ver no console

          setTimeout(() => {
            btn.value = originalBtnText;
            btn.style.backgroundColor = '';
            btn.disabled = false;
            btn.style.cursor = 'pointer';
          }, 3000);
        });
    });
  }
});