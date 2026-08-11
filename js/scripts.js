// 1. ENCAPSULAMENTO: Espera todo o HTML carregar antes de rodar o script.
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // LÓGICA DO HEADER (ALTA PERFORMANCE)
  // ==========================================
  const header = document.getElementById('header');
  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
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

      // Honeypot: campo invisível que só um bot preencheria. Se vier preenchido, descarta em silêncio.
      const honeypot = form.querySelector('#website');
      if (honeypot && honeypot.value.trim() !== '') {
        form.reset();
        return;
      }

      // Guarda o texto original e bloqueia o botão para evitar duplos cliques
      const originalBtnText = btn.value;
      btn.value = 'Enviando...';
      btn.disabled = true; 
      btn.style.cursor = 'not-allowed';

      const serviceID = 'default_service';
      const templateID = 'template_m7mz6dg';

      emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
          // UX Moderna: Feedback visual de sucesso
          btn.value = 'Mensagem Enviada!';
          btn.style.backgroundColor = '#28a745'; 
          form.reset(); 

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
          btn.style.backgroundColor = '#dc3545'; 
          console.error('Erro no EmailJS:', err); 

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