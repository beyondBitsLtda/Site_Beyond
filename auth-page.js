import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseApp } from "./firebase-init.js";

const auth = getAuth(firebaseApp);

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const registerFeedback = document.getElementById("register-feedback");
const loginFeedback = document.getElementById("login-feedback");
const openRegisterBtn = document.getElementById("open-register");
const backToLoginBtn = document.getElementById("back-to-login");

function formatAuthError(error) {
  const code = error?.code || "";
  if (code === "auth/configuration-not-found") {
    return "Configuração do Firebase Auth ausente. Verifique as credenciais e habilite Email/Senha no console do Firebase.";
  }
  if (code === "auth/email-already-in-use") {
    return "Este e-mail já está cadastrado.";
  }
  if (code === "auth/invalid-credential") {
    return "Credenciais inválidas. Revise e tente novamente.";
  }
  return error?.message || "Não foi possível concluir a operação.";
}

function redirectToApp() {
  window.location.href = "index.html";
}

function showLogin() {
  loginForm?.setAttribute("style", "");
  registerForm?.setAttribute("style", "display: none;");
  registerFeedback.textContent = "";
}

function showRegister() {
  loginForm?.setAttribute("style", "display: none;");
  registerForm?.setAttribute("style", "");
  loginFeedback.textContent = "";
}

openRegisterBtn?.addEventListener("click", showRegister);
backToLoginBtn?.addEventListener("click", showLogin);

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerFeedback.textContent = "";
  const displayName = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await signOut(auth);
    registerFeedback.textContent = "✅ Conta criada. Agora faça login para continuar.";
    registerFeedback.style.color = "green";
    showLogin();
  } catch (error) {
    registerFeedback.textContent = `Erro ao cadastrar: ${formatAuthError(error)}`;
    registerFeedback.style.color = "red";
  }
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginFeedback.textContent = "";
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginFeedback.textContent = "✅ Login realizado";
    loginFeedback.style.color = "green";
    redirectToApp();
  } catch (error) {
    loginFeedback.textContent = `Erro ao entrar: ${formatAuthError(error)}`;
    loginFeedback.style.color = "red";
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    redirectToApp();
  }
});
