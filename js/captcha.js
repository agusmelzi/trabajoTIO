document.querySelector("#btn-generar").addEventListener("click", generarTexto);

let resultado = document.querySelector("#resultado");

function generarTexto() {
    
    let texto = "";

    for (let i = 0; i < 3; i++) {
        texto += String.fromCharCode(randomNumber(97, 122));
        texto += String.fromCharCode(randomNumber(48, 57));
    }
    document.querySelector("#textoRandom").innerHTML = texto;

    document.querySelector("#btn-validar").addEventListener("click", validarCaptcha);

    function validarCaptcha() {
        let textoIngresado = document.querySelector("#textoAvalidar").value;
        console.log(textoIngresado);
        console.log(texto);
        console.log(texto == textoIngresado)
        if (texto == textoIngresado) {
            document.querySelector("#resultado").classList.add("correcto");
            document.querySelector("#resultado").classList.remove("incorrecto");
            resultado.innerHTML = "Captcha correcto";
            document.querySelector("#submit").type = "submit";
            document.querySelector("#submit").value = "CREAR CUENTA";
        } else {
            document.querySelector("#resultado").classList.add("incorrecto");
            document.querySelector("#resultado").classList.remove("correcto");
            resultado.innerHTML = "X Captcha incorrecto X";
            document.querySelector("#submit").type = "hidden";
        }
    }

}

function randomNumber(min, max) {
    let numero = Math.floor(Math.random() * (max - min + 1) + min);
    return numero;
}

