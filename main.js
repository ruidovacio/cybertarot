const container = document.querySelector('.container');
const url_string = window.location.href;
const url = new URL(url_string);
const parametro = url.searchParams.get("spread");
console.log(parametro);

cargarCartas();

async function cargarCartas() {
    const response = await fetch('tarot-images.json');
    const tarot = await response.json(); //este es el array con ambos arcanos, tarot.cards
    const mayores = tarot.cards.filter(carta => carta.arcana == 'Major Arcana');
    const menores = tarot.cards.filter(carta => carta.arcana == 'Minor Arcana');
    const baraja = mezclarCartas(tarot.cards);
    console.log(baraja);
    hacerTabla(baraja, parametro);
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
        barajaTabulada[3] = separador.slice(6,7);
        const cantidadFilas = 4;
        displayCartas(barajaTabulada, cantidadFilas);
    }

}

function displayCartas(barajaTabulada, cantidadFilas) {
    for (i = 0; i < cantidadFilas; i++) {
        //se crean tantos rows como cantidad de filas tenga la barja luego de la tabulación
        const row = document.createElement('div');
        row.classList.add('row');
        row.classList.add('justify-content-center');
        console.log(barajaTabulada[i]);
        for (let j = 0; j < barajaTabulada[i].length; j++) {
            const col = document.createElement('div');
            const imagen = document.createElement('img');
            imagen.src = "cards/" + barajaTabulada[i][j].img; //el contador [i][j], es el índice en la fila elegida
            col.appendChild(imagen);
            col.classList.add('col-auto');
            row.appendChild(col);
        }
        container.appendChild(row);
    }
}

function mezclarCartas(mazoElegido) {
    'use strict'
    const mezcla = window.knuthShuffle(mazoElegido.slice(0));
    return mezcla;
}
