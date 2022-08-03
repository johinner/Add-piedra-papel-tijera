const nombresMascotas = ["Gul'dan", "Tyrande", "Grommash"];
const habilidades = ["FUEGO", "TIERRA", "AGUA"];
let habilidadMaquina, habilidadAnfitrion;

let vidaMaquina = 3, vidaAnfitrion = 3;


const nombreAtaqueAnfitrion = document.getElementById("nombre-ataque-anfitrion");
const nombreAtaqueMaquina = document.getElementById("nombre-ataque-maquina");

const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionMascotas = document.getElementById("seleccionar-mascotas");
const contenedorResultado = document.querySelector(".info-resultado");

const buttonReiniciar = document.getElementById("reiniciar");

const personajeAnfitrion = document.getElementById("personaje-anfitrion");
const personajeMaquina = document.getElementById("personaje-maquina");

const ataqueAnfitrion = document.getElementById("img-ataque-anfitrion");
const ataqueMaquina = document.getElementById("img-ataque-maquina");

let empates = 0,
  victorias = 0,
  derotas = 0;

const resultados = document.querySelectorAll(".info-resultado span");

const nombreMascota = document.getElementById("nombre-mascota-enemigo");

const personajeSeleccionado = document.getElementById("nombre-personaje");
const inputMascotas = document.querySelectorAll("#seleccionar-mascotas input");

const fuego = document.getElementById("button-fuego");
const agua = document.getElementById("button-agua");
const tierra = document.getElementById("button-tierra");

const sectionMensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

iniciarJuego = () => {
  sectionAtaque.style.display = "none";
  buttonReiniciar.style.display = "none";
  selecHabilidad();
  buttonReiniciar.addEventListener("click", reiniciarJuego);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".tarjeta-mokepon img") ) {
    personajeSeleccionado.innerText = e.target.dataset.nombre;
    mostrarRutaImagen(e.target.dataset.nombre, personajeAnfitrion);
    sectionAtaque.style.display = "flex";
    sectionMascotas.style.display = "none";
    SelecMascMaquina();
  }
});

SelecMascMaquina = () => {
  let num = aleatorio(1, 3) - 1;
  nombreMascota.innerHTML = nombresMascotas[num];
  mostrarRutaImagen(nombresMascotas[num], personajeMaquina);
};

//   //forEach es el metodo de recorrer un arreglo.
//   inputMascotas.forEach(function (valor, indice, inputMascotas) {
//     if (valor.checked == true) {


selecHabilidad = (boolean) => {
  fuego.addEventListener("click", () => {
    habilidadAnfitrion = "FUEGO";
    mostrarRutaImagen("FUEGO", ataqueAnfitrion);
    nombreAtaqueAnfitrion.innerText = "FUEGO";
    selecHabilidadMaquina();
  });
  agua.addEventListener("click", () => {
    habilidadAnfitrion = "AGUA";
    mostrarRutaImagen("AGUA", ataqueAnfitrion);
    nombreAtaqueAnfitrion.innerText = "AGUA";
    selecHabilidadMaquina();
  });
  tierra.addEventListener("click", () => {
    habilidadAnfitrion = "TIERRA";
    mostrarRutaImagen("TIERRA", ataqueAnfitrion);
    nombreAtaqueAnfitrion.innerText = "TIERRA";
    selecHabilidadMaquina();
  });
//disable desactiva o activa la funcionalizada de un elemento
  if (boolean == false) {
    fuego.disabled = false;
    agua.disabled = false;
    tierra.disabled = false;
  } else if (boolean == true) {
    fuego.disabled = true;
    agua.disabled = true;
    tierra.disabled = true;
  }
};

selecHabilidadMaquina = () => {
  let num = aleatorio(1, 3) - 1;
  habilidadMaquina = habilidades[num];
  mostrarRutaImagen(habilidades[num], ataqueMaquina);
  nombreAtaqueMaquina.innerText = habilidades[num];
  resultadoEnfrenramiento();
  resultadoFinal();
};

crearMensaje = (resultado) => {
  
  let parrafo = document.createElement("div");
  sectionMensaje.textContent = "";
  parrafo.style.display = "flex";
  parrafo.innerHTML = `<img src="./assets/${habilidadAnfitrion}-efecto.png" alt="${habilidadAnfitrion}" /> <p>${resultado}</p> <img class="rotate" src="./assets/${habilidadMaquina}-efecto.png" alt="${habilidadMaquina}" />`;

  sectionMensaje.appendChild(parrafo);

  vidasRestantes();
};

resultadoEnfrenramiento = () => {
  if (habilidadMaquina == habilidadAnfitrion) {
    crearMensaje("EMPATE");
    empates++;
  } else if (
    (habilidadAnfitrion == "FUEGO" && habilidadMaquina == habilidades[1]) ||
    (habilidadAnfitrion == "AGUA" && habilidadMaquina == habilidades[0]) ||
    (habilidadAnfitrion == "TIERRA" && habilidadMaquina == habilidades[2])
  ) {
    vidaMaquina = vidaMaquina - 1;
    crearMensaje("VICTORIA");
    victorias++;
  } else {
    vidaAnfitrion = vidaAnfitrion - 1;
    crearMensaje("DERROTA");
    derotas++;
  }
};
resultadoFinal = () => {
  resultados[0].innerText = victorias;
  resultados[1].innerText = derotas;
  resultados[2].innerText = empates;

  if (vidaAnfitrion == 0) {
    resultado.innerText = "=> GAME OVER <=";
    selecHabilidad(true);
    buttonReiniciar.style.display = "flex";
    contenedorResultado.style.display = "block";
  } else if (vidaMaquina == 0) {
    resultado.innerText = "=> VIPTORY <=";
    selecHabilidad(true);
    buttonReiniciar.style.display = "flex";
    contenedorResultado.style.display = "block";
  }
};

removerClass = (opcion, elemento) => {
  if (opcion == "add") {
    elemento.classList.add("visible");
  } else if (opcion == "remove") {
    elemento.classList.remove("visible");
  }
};

vidasRestantes = () => {
  document.getElementById("vidad-anfitrion").innerHTML = vidaAnfitrion;
  document.getElementById("vidad-maquina").innerHTML = vidaMaquina;
};

mostrarRutaImagen = (ruta, id) => {
  return (id.innerHTML = ` <img src="./assets/${ruta}.png" alt="${ruta}" />`);
};

reiniciarJuego = () => {
  location.reload();
};

window.addEventListener("load", iniciarJuego);
