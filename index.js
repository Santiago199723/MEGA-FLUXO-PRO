// Import and configure Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config here
};

firebase.initializeApp(firebaseConfig);

// Export the auth object
export const auth = firebase.auth();

// Check if the user is authenticated
auth.onAuthStateChanged((user) => {
  if (!user) {
    // User is not logged in
    alert("Você precisa estar logado para acessar ao indicador! Suporte: https://t.me/+By1fd0M7ZCAwNmFh");
    window.location.href = "index.html";
  } else {
    // User is logged in
    const userLogado = {
      nome: user.displayName,
      // Add other user properties as needed
    };

    const logadoElement = document.querySelector("#logado");
    const logado = document.querySelector("#logado");

    if (userLogado && userLogado.nome) {
      logado.innerHTML = `<span style="font-family: 'Verdana', sans-serif; color: #4CAF50; font-size: 0.4em;">Aqui o sucesso é garantido.${userLogado.nome}</span>`;
    } else {
      logado.innerHTML = `<span style="font-family: 'Verdana', sans-serif; color: #4CAF50; font-size: 0.4em;">Aqui o sucesso é garantido.</span>`;
    }
  }
});

// Function to sign out
function sair() {
  auth.signOut().then(() => {
    window.location.href = "signin.html";
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
}
