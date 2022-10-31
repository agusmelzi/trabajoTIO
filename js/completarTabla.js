"use strict"

let url = 'https://62c38328876c4700f53d60be.mockapi.io/api/libros';
let formulario = document.querySelector("#formAgregarLibro");
formulario.addEventListener("submit", nuevoIngreso);

window.addEventListener("load", cargarTabla);

async function cargarTabla() {

    let contenidoTabla = document.querySelector("#contenidoTabla");
    contenidoTabla.innerHTML = "";

    try {
        let res = await fetch(url);
        let tabla = await res.json();
        console.log(tabla);
        for (const libro of tabla) {
            //let id = libro.id;
            contenidoTabla.innerHTML += `<tr><td>${libro.titulo}</td><td>${libro.autor}</td><td>${libro.editorial}
            </td><td>${libro.anio}</td>
            <td><button class="borrarItem" id="borrarItem"><i class="fa-solid fa-trash borrar"></i></button></td>
            <td><button class="editarItem" data-id="${libro.id}"><i class="fa-solid fa-pen-to-square editar"></i></button></td></tr>`;
            console.log(contenidoTabla);
        }
        asignarItemDelete();
        asignarItemEdit();
    } catch (error) {
        console.log(error);
    }

}

async function asignarItemDelete() {
    let buttons = document.querySelectorAll("#borrarItem");
    let res = await fetch(url);
    let tabla = await res.json();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => { borrarItem(tabla[i].id) })
    }
}

async function borrarItem(idLibro) {
    try {
        let res = await fetch(`${url}/${idLibro}`, {
            "method": "DELETE"
        });
    } catch (error) {
        console.log(error);
    }

    cargarTabla();
}

async function nuevoIngreso(e) {
    e.preventDefault();
    let formData = new FormData(formAgregarLibro);

    let nuevoIngreso = {
        titulo: formData.get('titulo'),
        autor: formData.get('autor'),
        editorial: formData.get('editorial'),
        anio: formData.get('anio')
    };

    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(nuevoIngreso)
        });
    } catch (error) {
        console.log(error);
    }

    cargarTabla();
    formulario.reset();
}

let modal = document.querySelector(".modal");
let btnClose = document.querySelector("#close");

btnClose.addEventListener("click", function () {
    modal.style.display = "none";
})
window.addEventListener("click", function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
})

async function asignarItemEdit() {

    let buttons = document.querySelectorAll(".editarItem");
    let res = await fetch(url);
    let tabla = await res.json();
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            modal.style.display = "block";
        });
        buttons[i].addEventListener("click", cargarItemEditar);
    }
}