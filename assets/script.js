const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
const nav = document.querySelector(".main-nav");
const menuToggle = document.querySelector(".menu-toggle");
const revealables = document.querySelectorAll(".reveal");
const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
const FORM_ENDPOINT = "https://formsubmit.co/ajax/beyondbits@beyond.dev.br";

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

async function submitContactForm(payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar, tente novamente.");
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "Preencha todos os campos para seguir.";
    feedback.style.color = "#ff5ea8";
    return;
  }

  feedback.textContent = "Enviando...";
  feedback.style.color = "#18a1ff";

  try {
    await submitContactForm({ name, email, message });
    feedback.textContent = "Mensagem enviada com sucesso!";
    feedback.style.color = "#4ade80";
    form.reset();
  } catch (error) {
    feedback.textContent = "Não foi possível enviar. Tente novamente em instantes.";
    feedback.style.color = "#ff5ea8";
  }
});
