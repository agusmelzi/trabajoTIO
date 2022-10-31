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