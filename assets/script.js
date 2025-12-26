const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
const nav = document.querySelector(".main-nav");
const menuToggle = document.querySelector(".menu-toggle");
const revealables = document.querySelectorAll(".reveal");
const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    nav.classList.remove("open");
  });
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealables.forEach((el) => observer.observe(el));

function buildMailtoURL(name, email, message) {
  const subject = encodeURIComponent("Contato - Beyond Bits");
  const body = encodeURIComponent(
    `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
  );
  return `mailto:contato@beyondbits.com?subject=${subject}&body=${body}`;
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "Preencha todos os campos para seguir.";
    feedback.style.color = "#ff5ea8";
    return;
  }

  const mailto = buildMailtoURL(name, email, message);
  window.location.href = mailto;
  feedback.textContent = "Abrimos seu app de e-mail com a mensagem pronta.";
  feedback.style.color = "#18a1ff";
  form.reset();
});
