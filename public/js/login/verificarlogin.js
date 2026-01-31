function verificarLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const img = document.getElementById("resultadoImg");

    // login de teste
    if (email === "teste@email.com" && senha === "1234") {
        img.src = "image/mario.png"; // imagem de acerto
        img.classList.remove("d-none");
    } else {
        img.src = "/image/game-over.png"; // imagem de erro
        img.classList.remove("d-none");
    }
}