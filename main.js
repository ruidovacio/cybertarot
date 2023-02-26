const container = document.querySelector(".container");
const url_string = window.location.href;
const url = new URL(url_string);
//const parametro = url.searchParams.get("spread");
const popupObjeto = document.getElementById("miPopup");
const popupContenido = document.querySelector("popup-contenido");
const popupCerrar = document.getElementsByClassName("popup-cerrar")[0];
const displayPagina = document.querySelector(".container");
const spreadCheck = document.getElementById("spread-check");
const pageInfo = document.querySelector(".pageinfo");
let baraja = [];
let lista = [];
let mazoCargado = false;

cargarCartas()
  .then((lista) => console.log(lista))
  .catch((reason) => console.log(reason.message));

async function cargarCartas() {
  const response = await fetch("tarot-images.json");
  const tarot = await response.json(); //este es el array con ambos arcanos, tarot.cards
  const todas = await tarot.cards;
  const mayores = await tarot.cards.filter(
    (carta) => carta.arcana == "Major Arcana"
  );
  const menores = await tarot.cards.filter(
    (carta) => carta.arcana == "Minor Arcana"
  );
  lista = await todas;
  mazoCargado = await true;
  return lista;
}

async function hacerTabla(tirada) {
  pageInfo.style.display = "none";
  displayPagina.innerHTML = await "";
  if (mazoCargado == true) {
    baraja.length = 0;
    baraja = await lista;
    if (spreadCheck.checked == true) {
      baraja = await baraja.filter((carta) => carta.arcana == "Major Arcana");
    }

    baraja = await mezclarCartas(baraja);
    baraja = await mezclarCartas(baraja);
    baraja = await mezclarCartas(baraja);
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
      console.log(barajaTabulada);
      displayCartas(barajaTabulada, cantidadFilas);
    } else if (tirada == 6) {
      const separador = [
        baraja[0],
        baraja[1],
        baraja[2],
        baraja[3],
        baraja[4],
        baraja[5],
      ];
      const barajaTabulada = [];
      barajaTabulada[0] = separador.slice(0, 1);
      barajaTabulada[1] = separador.slice(1, 3);
      barajaTabulada[2] = separador.slice(3, 6);
      const cantidadFilas = 3;
      console.log(barajaTabulada);
      displayCartas(barajaTabulada, cantidadFilas);
    } else if (tirada == 7) {
      const separador = [
        baraja[0],
        baraja[1],
        baraja[2],
        baraja[3],
        baraja[4],
        baraja[5],
        baraja[6],
      ];
      const barajaTabulada = [];
      barajaTabulada[0] = separador.slice(0, 1);
      barajaTabulada[1] = separador.slice(1, 4);
      barajaTabulada[2] = separador.slice(4, 6);
      barajaTabulada[3] = separador.slice(6, 7);
      const cantidadFilas = 4;
      console.log(barajaTabulada);
      displayCartas(barajaTabulada, cantidadFilas);
    }
  }
  displayInterpretacion(baraja, tirada);
}

async function displayCartas(barajaTabulada, cantidadFilas) {
  count = 0;
  for (i = 0; i < cantidadFilas; i++) {
    //se crean tantos rows como cantidad de filas tenga la barja luego de la tabulación
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("gx-0");
    row.classList.add("justify-content-center");
    for (let j = 0; j < barajaTabulada[i].length; j++) {
      const col = document.createElement("div");
      const imagen = document.createElement("img");
      const boton = document.createElement("button");
      imagen.src = "cards/" + barajaTabulada[i][j].img; //el contador [i][j], es el índice en la fila elegida
      if (getRandomInt(100)>90){
      imagen.classList.add("invertir-imagen");
    }
      boton.setAttribute("id", count);
      boton.setAttribute("onClick", "accion(this.id)");
      boton.classList.add("botonimagen");
      count = count + 1;
      boton.appendChild(imagen);
      col.appendChild(boton);
      col.classList.add("col-6");
      col.classList.add("col-md-4");
      row.appendChild(col);
    }
    container.appendChild(row);
  }
}

async function displayInterpretacion(baraja, tirada) {
  document.querySelector(".interpretacion").style.display = "block";
  const interpretacion = document.getElementById("contenido-interpretacion");
  const textointerpretacion = document.createElement("p");
  interpretacion.innerHTML = "";
  for (let i = 0; i < tirada; i++) {
    const interpretacionRandom = getRandomInt(baraja[i].keywords.length);
    textointerpretacion.innerHTML += "<mark>" + baraja[i].keywords[interpretacionRandom] + "</mark>" + " ";
    console.log(interpretacionRandom);
  }
  interpretacion.appendChild(textointerpretacion);
}

async function accion(elementId) {
  console.log(baraja[elementId]);
  popupObjeto.style.display = "block";
  popupCerrar.onclick = function () {
    popupObjeto.style.display = "none";
  };
  const nombreCarta = document.getElementById("nombre-carta");
  nombreCarta.innerText = baraja[elementId].name;
  const imagenCarta = document.getElementById("imagen-carta");
  imagenCarta.src = "cards/" + baraja[elementId].img;
  const arquetipoCarta = document.getElementById("arquetipo-carta");
  const arquetipoCartaTexto = document.getElementById("arquetipo-carta-texto");
  if (baraja[elementId].Archetype != undefined) {
    arquetipoCarta.innerHTML = "Archetype";
    arquetipoCartaTexto.innerHTML = baraja[elementId].Archetype;
    arquetipoCarta.style.display = "block";
    arquetipoCartaTexto.style.display = "block";
  } else {
    arquetipoCarta.style.display = "none";
    arquetipoCartaTexto.style.display = "none";
  }
  const tipoCarta = document.getElementById("tipo-carta");
  const tipoCartaTexto = document.getElementById("tipo-carta-texto");
  if (baraja[elementId].Astrology != undefined) {
    tipoCarta.innerHTML = "Astrology";
    tipoCartaTexto.innerHTML = baraja[elementId].Astrology;
  } else if (baraja[elementId].Elemental != undefined) {
    tipoCarta.innerHTML = "Elemental";
    tipoCartaTexto.innerHTML = baraja[elementId].Elemental;
  }
  const numerologyCarta = document.getElementById("numerology-carta");
  const numerologyCartaTexto = document.getElementById(
    "numerology-carta-texto"
  );
  numerologyCartaTexto.innerHTML = "";
  if (baraja[elementId].Numerology != undefined) {
    numerologyCartaTexto.innerHTML = baraja[elementId].Numerology;
    numerologyCarta.style.display = "block";
    numerologyCartaTexto.style.display = "block";
  } else {
    numerologyCarta.style.display = "none";
    numerologyCartaTexto.style.display = "none";
  }
  //const elementalsCarta = document.getElementById("elementals-carta");
  const keywordsCarta = document.getElementById("keywords-carta");
  keywordsCarta.innerHTML = "";
  for (i = 0; i < baraja[elementId].keywords.length; i++) {
    console.log(i);
    keywordsCarta.innerHTML +=
      "<mark>" + baraja[elementId].keywords[i] + "</mark> ";
  }
  const simbologiaCarta = document.getElementById("simbologia-carta");
  const simbologiaCartaTexto = document.getElementById(
    "simbologia-carta-texto"
  );
  if (baraja[elementId]["Mythical/Spiritual"] != undefined) {
    simbologiaCarta.innerHTML = "Symbols";
    simbologiaCartaTexto.innerHTML = baraja[elementId]["Mythical/Spiritual"];
  } else {
    simbologiaCarta.innerHTML = "";
    simbologiaCartaTexto.innerHTML = "";
  }
}

async function mezclarCartas(mazoElegido) {
  "use strict";
  const mezcla = window.knuthShuffle(mazoElegido.slice(0));
  return mezcla;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
