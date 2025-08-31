import emailjs from "@emailjs/browser";

// Inicializar EmailJS com sua chave pública
emailjs.init("");

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  toggleBtn.addEventListener('click', () => {
    mobileMenu.style.display =
    mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    mobileMenu.classList.toggle("show");
    toggleBtn.classList.toggle("active");
  });

  mobileMenu.addEventListener('click', () => {
    mobileMenu.style.display =
      mobileMenu.style.display === 'flex' ? 'none' : 'flex';
        mobileMenu.classList.remove("show");
      toggleBtn.classList.remove("active"); 

  });


const form = document.getElementById("formContato");
  form.addEventListener("submit", enviarFormulario);
});


function enviarFormulario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;
  const resposta = document.getElementById('resposta');

  emailjs.send("", "", {
    name: nome,
    email: email,
    message: mensagem
  }, "")
    .then(() => {
      resposta.textContent = "Enviado com sucesso!";
      resposta.style.color = "green";
      document.getElementById('formContato').reset();
    })
    .catch((error) => {
      resposta.textContent = "Erro: " + error.text;
      resposta.style.color = "red";
    });

  return false;
}
