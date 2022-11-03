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

async function cargarItemEditar(e) {

    let res = await fetch(url);
    let tabla = await res.json();
    const idSeleccionado = this.dataset.id;
    let libroSeleccionado = tabla.find(
        function (libro) {
            return libro.id == idSeleccionado
        });

    idLibro.value = libroSeleccionado.id;
    titulo.value = libroSeleccionado.titulo;
    autor.value = libroSeleccionado.autor;
    editorial.value = libroSeleccionado.editorial;
    anio.value = libroSeleccionado.anio;

}

let formularioEditar = document.querySelector("#formEditarLibro");
formularioEditar.addEventListener("submit", editarItem);

async function editarItem(e){
    e.preventDefault();
    let formData = new FormData(this);
    let ItemEditado = {
        titulo: formData.get('titulo'),
        autor: formData.get('autor'),
        editorial: formData.get('editorial'),
        anio: formData.get('anio')
    };
    //let res = null;
    try {
        let res = await fetch(`${url}/${formData.get("id")}`, { 
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(ItemEditado)
        });

    } catch (error) {
        console.log(error);
    }
    modal.style.display = "none";
    cargarTabla();
}

document.querySelector("#btn-vaciarTabla").addEventListener("click", vaciarTabla);

async function vaciarTabla() {
    let res = await fetch(url);
    let tabla = await res.json();
    for (let libro of tabla) {
        try {
            let res = await fetch(`${url}/${libro.id}`, {
                "method": "DELETE"
            });
        } catch (error) {
            console.log(error);
        }
    }
    cargarTabla();
}

document.querySelector("#btn-cargarItems").addEventListener("click", cargarItems);

async function cargarItems() {
    let libro1, libro2, libro3;
    let libros = [libro1, libro2, libro3];
    for (let libro of libros) {
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(libro)
            });
        } catch (error) {
            console.log(error);
        }
    }
    cargarTabla();
}
