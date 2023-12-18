document.addEventListener('DOMContentLoaded', function () {
  const btnEye = document.querySelector('.fa-eye');
  const inputSenha = document.querySelector('#senha');
  const msgError = document.querySelector('#msgError');
  const usuario = document.querySelector('#usuario');
  const senha = document.querySelector('#senha');

  function showErrorMessage(message) {
    msgError.style.display = 'block';
    msgError.innerHTML = message;
  }

  function hideErrorMessage() {
    msgError.style.display = 'none';
    msgError.innerHTML = '';
  }

  function isValidEmail(email) {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function entrar() {
    console.log("Tentativa de login iniciada.");
    hideErrorMessage();
    showLoading();

    // Verificar se ambos os campos estão preenchidos
    if (!usuario.value || !senha.value) {
      showErrorMessage('Preencha todos os campos para poder logar.');
      hideLoading();
      return;
    }

    const email = usuario.value;
    const password = senha.value;

    // Validar o formato do e-mail
    if (!isValidEmail(email)) {
      showErrorMessage('Formato de e-mail inválido.');
      hideLoading();
      return;
    }

    console.log("Email:", email);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Login bem-sucedido.");
        hideLoading();
        window.location.href = "../../indicador.html";
      })
      .catch(error => {
        console.error("Erro durante o login:", error);
        hideLoading();
        showErrorMessage(getErrorMessage(error));
      });
  }

  function getErrorMessage(error) {
    if (error.code === "auth/user-not-found") {
      return "Usuário não encontrado";
    } else if (error.code === "auth/invalid-login-credentials") {
      return "Cliente não tem cadastro ou e-mail e senha incorretos.";
    } else if (error.code === "auth/invalid-email") {
      return "Endereço de e-mail inválido";
    }
    return error.message;
  }

  function register() {
    window.location.href = "pages/register/register.html";
  }

  function toggleEmailErrors() {
    const email = usuario.value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = isValidEmail(email) ? "none" : "block";
  }

  function togglePasswordErrors() {
    const password = senha.value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
  }

  function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
  }

  function isEmailValid() {
    const email = usuario.value;
    if (!email) {
      return false;
    }
    return isValidEmail(email);
  }

  function isPasswordValid() {
    return senha.value ? true : false;
  }

  const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
  };

  // Evento de clique no botão "Entrar"
  const btnEntrar = document.querySelector('#btnEntrar');
  if (btnEntrar) {
    btnEntrar.addEventListener('click', entrar);
  }
});
