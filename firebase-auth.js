// Integração de autenticação com Firebase Authentication, separada do restante da lógica da aplicação.
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseApp } from "./firebase-init.js";

// Recupera a instância do app inicializada em firebase-init.js para reutilizar a mesma configuração do projeto.
let auth;
try {
  auth = getAuth(firebaseApp);
} catch (error) {
  console.error("[Firebase] Falha ao inicializar autenticação:", error);
}

// Seletores do DOM usados no painel de login/cadastro.
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const authStatus = document.getElementById("auth-status");
const registerFeedback = document.getElementById("register-feedback");
const loginFeedback = document.getElementById("login-feedback");
// Garante que o usuário receba feedback caso algo impeça a inicialização do Firebase.
if (!auth) {
  if (registerFeedback) {
    registerFeedback.textContent =
      "Configuração do Firebase ausente ou inválida. Verifique o firebase-init.js.";
    registerFeedback.style.color = "red";
  }
  if (loginFeedback) {
    loginFeedback.textContent =
      "Não foi possível carregar o Firebase Auth. Revise as credenciais.";
    loginFeedback.style.color = "red";
  }
}

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

// Atualiza visualmente o painel de acordo com o usuário autenticado.
function updateAuthUI(user) {
  const isLoggedIn = Boolean(user);
  if (isLoggedIn) {
    authStatus.textContent = `Autenticado como: ${user.displayName || user.email}`;
    logoutBtn.style.display = "block";
  } else {
    authStatus.textContent = "Não autenticado";
    logoutBtn.style.display = "none";
    registerForm?.reset();
    loginForm?.reset();
  }
}

// Trata o envio do formulário de cadastro usando e-mail/senha com criação segura no Firebase.
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerFeedback.textContent = "";
  const displayName = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  if (!auth) {
    registerFeedback.textContent =
      "Firebase Auth não inicializado. Confira as credenciais do projeto.";
    registerFeedback.style.color = "red";
    return;
  }

  try {
    // Cria o usuário com segurança no backend do Firebase.
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Armazena o nome de exibição para uso na UI.
    await updateProfile(user, { displayName });
    registerFeedback.textContent = "✅ Cadastro realizado com sucesso";
    registerFeedback.style.color = "green";
  } catch (error) {
    // Exibe mensagens claras de erro para facilitar a depuração.
    registerFeedback.textContent = `Erro ao cadastrar: ${formatAuthError(error)}`;
    registerFeedback.style.color = "red";
  }
});

// Trata a autenticação de usuários existentes usando e-mail/senha com Firebase Auth.
loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginFeedback.textContent = "";
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!auth) {
    loginFeedback.textContent =
      "Firebase Auth não inicializado. Confira as credenciais do projeto.";
    loginFeedback.style.color = "red";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginFeedback.textContent = "✅ Login realizado";
    loginFeedback.style.color = "green";
  } catch (error) {
    loginFeedback.textContent = `Erro ao entrar: ${formatAuthError(error)}`;
    loginFeedback.style.color = "red";
  }
});

// Permite que o usuário encerre a sessão de forma explícita.
logoutBtn?.addEventListener("click", async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    authStatus.textContent = `Erro ao sair: ${error.message}`;
  }
});

// Observa mudanças na sessão para manter o painel sincronizado e seguro.
document.addEventListener("DOMContentLoaded", () => {
  updateAuthUI(auth?.currentUser || null);
  if (!auth) return;

  onAuthStateChanged(auth, (user) => {
    updateAuthUI(user);
    if (!user) {
      // Limpa feedbacks quando o usuário desconecta.
      registerFeedback.textContent = "";
      loginFeedback.textContent = "";
    }
  });
});
