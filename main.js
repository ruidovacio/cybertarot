const container = document.querySelector('.container');
const url_string = window.location.href;
const url = new URL(url_string);
const parametro = url.searchParams.get("spread");
const popupObjeto = document.getElementById('miPopup');
const popupContenido = document.querySelector('popup-contenido');
const popupCerrar = document.getElementsByClassName('popup-cerrar')[0];
console.log(parametro);
let lista = [];


cargarCartas()

async function cargarCartas() {
    const response = await fetch('tarot-images.json');
    const tarot = await response.json(); //este es el array con ambos arcanos, tarot.cards
    const mayores = await tarot.cards.filter(carta => carta.arcana == 'Major Arcana');
    const menores = await tarot.cards.filter(carta => carta.arcana == 'Minor Arcana');
    const baraja = await mezclarCartas(tarot.cards);
    lista = baraja;
    console.log(lista);
    hacerTabla(baraja, parametro)//.then(
    //interactuar(baraja));
}

async function hacerTabla(baraja, tirada) {
    if (tirada == 3) {
        const separador = [baraja[0], baraja[1], baraja[2]];
        const barajaTabulada = [];
        barajaTabulada[0] = separador;
        console.log(separador);
        const cantidadFilas = 1;

        displayCartas(barajaTabulada, cantidadFilas);

    } else if (tirada == 4) {
        const separador = [baraja[0], baraja[1], baraja[2], baraja[3]];
        const barajaTabulada = [];
        barajaTabulada[0] = separador.slice(0, 1);
        barajaTabulada[1] = separador.slice(1, 3);
        barajaTabulada[2] = separador.slice(3, 4);
        const cantidadFilas = 3;
        console.log(barajaTabulada);
        displayCartas(barajaTabulada, cantidadFilas);

    } else if (tirada == 5) {
        const separador = [baraja[0], baraja[1], baraja[2], baraja[3], baraja[4]];
        const barajaTabulada = [];
        barajaTabulada[0] = separador.slice(0, 2);
        barajaTabulada[1] = separador.slice(2, 3);
        barajaTabulada[2] = separador.slice(3, 5);
        const cantidadFilas = 3;
        displayCartas(barajaTabulada, cantidadFilas);
    } else if (tirada == 6) {
        const separador = [baraja[0], baraja[1], baraja[2], baraja[3], baraja[4], baraja[5]];
        const barajaTabulada = [];
        barajaTabulada[0] = separador.slice(0, 1);
        barajaTabulada[1] = separador.slice(1, 3);
        barajaTabulada[2] = separador.slice(3, 6);
        const cantidadFilas = 3;
        displayCartas(barajaTabulada, cantidadFilas);
    } else if (tirada == 7) {
        const separador = [baraja[0], baraja[1], baraja[2], baraja[3], baraja[4], baraja[5], baraja[6]];
        const barajaTabulada = [];
        barajaTabulada[0] = separador.slice(0, 1);
        barajaTabulada[1] = separador.slice(1, 4);
        barajaTabulada[2] = separador.slice(4, 6);
        barajaTabulada[3] = separador.slice(6, 7);
        const cantidadFilas = 4;
        displayCartas(barajaTabulada, cantidadFilas);
    }

}

async function displayCartas(barajaTabulada, cantidadFilas) {
    count = 0;
    for (i = 0; i < cantidadFilas; i++) {
        //se crean tantos rows como cantidad de filas tenga la barja luego de la tabulación
        const row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('justify-content-center');
        for (let j = 0; j < barajaTabulada[i].length; j++) {
            const col = document.createElement('div');
            const imagen = document.createElement('img');
            const boton = document.createElement('button');
            imagen.src = "cards/" + barajaTabulada[i][j].img; //el contador [i][j], es el índice en la fila elegida
            boton.setAttribute("id", count);
            boton.setAttribute("onClick", "accion(this.id)");
            boton.classList.add("botonimagen");
            console.log(count);
            count = count + 1;
            boton.appendChild(imagen);
            col.appendChild(boton);
            col.classList.add('col-6');
            col.classList.add('col-md-4');
            row.appendChild(col);
        }
        container.appendChild(row);
    }
}

async function accion(elementId) {
    console.log(lista[elementId]);
    popupObjeto.style.display = "block";
    popupCerrar.onclick = function () {
        popupObjeto.style.display = "none";
    }
    const nombreCarta = document.getElementById('nombre-carta');
    nombreCarta.innerText = lista[elementId].name;
    const imagenCarta = document.getElementById('imagen-carta');
    imagenCarta.src = "cards/" + lista[elementId].img;
    const tipoCarta = document.getElementById('tipo-carta');
    const tipoCartaTexto = document.getElementById('tipo-carta-texto')
    if (lista[elementId].Archetype != undefined) {
        tipoCarta.innerHTML = "Archetype";
        tipoCartaTexto.innerHTML = lista[elementId].Archetype;
    } else if (lista[elementId].Astrology != undefined) {
        tipoCarta.innerHTML = "Astrology";
        tipoCartaTexto.innerHTML = lista[elementId].Astrology;
    } else if (lista[elementId].Elemental != undefined) {
        tipoCarta.innerHTML = "Elemental";
        tipoCartaTexto.innerHTML = lista[elementId].Elemental;
    }
    const keywordsCarta = document.getElementById('keywords-carta');
    const formatear = String(lista[elementId].keywords);
    keywordsCarta.innerHTML = formatear.split(",").join("<br>");
    const simbologiaCarta = document.getElementById('simbologia-carta');
    const simbologiaCartaTexto = document.getElementById('simbologia-carta-texto');
    if (lista[elementId]["Mythical/Spiritual"] != undefined) {
        simbologiaCarta.innerHTML = "Symbols";
        simbologiaCartaTexto.innerHTML = lista[elementId]["Mythical/Spiritual"];
    } else {
        simbologiaCarta.innerHTML = "";
        simbologiaCartaTexto.innerHTML= "";
    }
}



// async function interactuar(id) {
//     document.addEventListener('click', (e) => {
//         let elementId = e.target.id;
//         if (elementId != '') {
//             console.log(baraja[elementId].name);

//         }
//         else {
//             console.log("nada");
//         }
//     })
// }

async function mezclarCartas(mazoElegido) {
    'use strict'
    const mezcla = window.knuthShuffle(mazoElegido.slice(0));
    return mezcla;
}
