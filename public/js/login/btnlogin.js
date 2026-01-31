const btn = document.getElementById("btnEntrar");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const msg = document.getElementById("mensagem");
const mario = document.getElementById("mario");

btn.addEventListener("click", function () {

    const emailCorreto = "teste@email.com";
    const senhaCorreta = "1234";

    if (email.value === emailCorreto && senha.value === senhaCorreta) {
        msg.innerHTML = "Login correto! 🎉";
        msg.style.color = "green";

        mario.src = "/image/mario.gif";
        mario.style.display = "block";

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1000);

    } else {
        msg.innerHTML = "Email ou senha incorretos ❌";
        msg.style.color = "red";

        mario.src = "/image/game-over.png"; // coloca uma imagem de erro na pasta
        mario.style.display = "block";
    }

});
