// Integração de autenticação com Firebase Authentication, separada do restante da lógica da aplicação.
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Recupera a instância do app inicializada em firebase-init.js para reutilizar a mesma configuração do projeto.
const auth = getAuth(window.firebaseApp);

// Seletores do DOM usados no painel de login/cadastro.
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const authStatus = document.getElementById("auth-status");
const registerFeedback = document.getElementById("register-feedback");
const loginFeedback = document.getElementById("login-feedback");

// Atualiza visualmente o painel de acordo com o usuário autenticado.
function updateAuthUI(user) {
  if (user) {
    // Mostra o nome ou e-mail do usuário autenticado.
    authStatus.textContent = `Autenticado como: ${user.displayName || user.email}`;
    logoutBtn.style.display = "block";
  } else {
    authStatus.textContent = "Não autenticado";
    logoutBtn.style.display = "none";
  }
}

// Trata o envio do formulário de cadastro usando e-mail/senha com criação segura no Firebase.
registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  registerFeedback.textContent = "";
  const displayName = document.getElementById("register-username").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value;

  try {
    // Cria o usuário com segurança no backend do Firebase.
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Armazena o nome de exibição para uso na UI.
    await updateProfile(user, { displayName });
    registerFeedback.textContent = "✅ Cadastro realizado com sucesso";
    registerFeedback.style.color = "green";
  } catch (error) {
    // Exibe mensagens claras de erro para facilitar a depuração.
    registerFeedback.textContent = `Erro ao cadastrar: ${error.message}`;
    registerFeedback.style.color = "red";
  }
});

// Trata a autenticação de usuários existentes usando e-mail/senha com Firebase Auth.
loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginFeedback.textContent = "";
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginFeedback.textContent = "✅ Login realizado";
    loginFeedback.style.color = "green";
  } catch (error) {
    loginFeedback.textContent = `Erro ao entrar: ${error.message}`;
    loginFeedback.style.color = "red";
  }
});

// Permite que o usuário encerre a sessão de forma explícita.
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    authStatus.textContent = `Erro ao sair: ${error.message}`;
  }
});

// Observa mudanças na sessão para manter o painel sincronizado e seguro.
onAuthStateChanged(auth, (user) => {
  updateAuthUI(user);
  if (!user) {
    // Limpa feedbacks quando o usuário desconecta.
    registerFeedback.textContent = "";
    loginFeedback.textContent = "";
  }
});
