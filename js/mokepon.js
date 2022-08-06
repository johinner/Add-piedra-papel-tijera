let habilidadMaquina, habilidadAnfitrion;
let PersonajeAleatorio;
let vidaMaquina = 3, vidaAnfitrion = 3;
// typeof(elemento) de que tipo es 

const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionMascotas = document.getElementById("seleccionar-mascotas");
const contenedorResultado = document.querySelector(".info-resultado");
const sectionHabilidades = document.getElementById('section-habilidades');

const buttonReiniciar = document.getElementById("reiniciar");

const imagenPersonajeAnfitrio = document.getElementById("personaje-anfitrion");
const nombrePersonajeAnfitrion = document.getElementById("nombre-personaje");

const imagenPersonajeMaquina = document.getElementById("personaje-maquina");
const nombrePersonajeMaquina = document.getElementById("nombre-mascota-enemigo");

const nombreAtaqueAnfitrion = document.getElementById("nombre-ataque-anfitrion");
const imagenAtaqueAnfitrion = document.getElementById("img-ataque-anfitrion");

const nombreHabilidaMaquina = document.getElementById("nombre-ataque-maquina");
const imagenHabilidaMaquina = document.getElementById("img-ataque-maquina");

let empates = 0,
  victorias = 0,
  derrotas = 0;

const resultados = document.querySelectorAll(".info-resultado span");

const sectionMensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

let pers;

let neverwinter = [];
let opcionNeverwinter;
let habilidad;
class Neverwinter{
    constructor(nombre, imagen, vida, defensa){
      this.nombre = nombre;
      this.imagen = imagen;
      this.habilidades = [];
      this.vida = vida;
      this.defensa = defensa;
    }
}
let guldan =  new Neverwinter("Gul'dan","./assets/Gul'dan.png",55,90,80)
let tyrande = new Neverwinter('Tyrande', "./assets/Tyrande.png",90,60,50)
let grommash = new Neverwinter('Grommash',"./assets/Grommash.png",80,70,60)

guldan.habilidades.push(
  {nombre: 'Agua', png: './assets/Agua.png', pngEfecto:'./assets/Agua-efecto.png'},
  {nombre: 'Agua', png: './assets/Agua.png', pngEfecto:'./assets/Agua-efecto.png'},
  {nombre: 'Agua', png: './assets/Agua.png', pngEfecto:'./assets/Agua-efecto.png'},
  {nombre: 'Fuego', png: './assets/Fuego.png', pngEfecto:'./assets/Fuego-efecto.png'},
  {nombre: 'Tierra', png: './assets/Tierra.png', pngEfecto:'./assets/Tierra-efecto.png'}
)
tyrande.habilidades.push(
  {nombre: 'Fuego', png: './assets/Fuego.png', pngEfecto:'./assets/Fuego-efecto.png'},
  {nombre: 'Fuego', png: './assets/Fuego.png', pngEfecto:'./assets/Fuego-efecto.png'},
  {nombre: 'Fuego', png: './assets/Fuego.png', pngEfecto:'./assets/Fuego-efecto.png'},
  {nombre: 'Tierra', png: './assets/Tierra.png', pngEfecto:'./assets/Tierra-efecto.png'}
)
grommash.habilidades.push(
  {nombre: 'Agua', png: './assets/Agua.png', pngEfecto:'./assets/Agua-efecto.png'},
  {nombre: 'Fuego', png: './assets/Fuego.png', pngEfecto:'./assets/Fuego-efecto.png'},
  {nombre: 'Tierra', png: './assets/Tierra.png', pngEfecto:'./assets/Tierra-efecto.png'},
  {nombre: 'Tierra', png: './assets/Tierra.png', pngEfecto:'./assets/Tierra-efecto.png'},
  {nombre: 'Tierra', png: './assets/Tierra.png', pngEfecto:'./assets/Tierra-efecto.png'}
)

neverwinter.push(guldan,tyrande,grommash)


aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

iniciarJuego = () => {
  neverwinter.forEach((neverwinter) =>{
    opcionNeverwinter = `
    <input type="radio" name="neverwinter" id=${neverwinter.nombre} />
    <label class="tarjeta-mokepon" for=${neverwinter.nombre} >
      <img src=${neverwinter.imagen} alt="${neverwinter.nombre}" data-nombre=${neverwinter.nombre}>
      <p>${neverwinter.nombre}</p>
    </label> 
  `
  contenedorTarjetas.innerHTML +=  opcionNeverwinter ;
  })
  sectionAtaque.style.display = "none";
  buttonReiniciar.style.display = "none";
  buttonReiniciar.addEventListener("click", reiniciarJuego);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".tarjeta-mokepon img") ) {
    nombrePersonajeAnfitrion.innerText = e.target.dataset.nombre;
    mostrarRutaImagen(e.target.dataset.nombre, imagenPersonajeAnfitrio);
    sectionAtaque.style.display = "flex";
    sectionMascotas.style.display = "none";
    renderizarhabilidades(e.target.dataset.nombre)
    selecPersonajeMaquina();
  }
  if(e.target.matches('#section-habilidades img')){
    nombreAtaqueAnfitrion.innerText = e.target.dataset.nombre
    mostrarRutaImagen(e.target.dataset.nombre,imagenAtaqueAnfitrion) 
    selecHabilidadMaquina()
  }

});

selecPersonajeMaquina = () => {
  PersonajeAleatorio = aleatorio(0, neverwinter.length-1);
  nombrePersonajeMaquina.innerHTML = neverwinter[PersonajeAleatorio].nombre;
  imagenPersonajeMaquina.innerHTML = `<img src=${neverwinter[PersonajeAleatorio].imagen} alt="${neverwinter[PersonajeAleatorio].nombre}" />`;
};

//   //forEach es el metodo de recorrer un arreglo.
//   inputMascotas.forEach(function (valor, indice, inputMascotas) {
//     if (valor.checked == true) {

renderizarhabilidades = (personaje) => {
  neverwinter.forEach((neverwinter) => {
    if(personaje == neverwinter.nombre){
      for(x of neverwinter.habilidades){
        habilidad = `<div>
        <p>${x.nombre}</p>
        <button>
          <img src=${x.png} alt=${x.nombre} data-nombre=${x.nombre}>
        </button>
      </div>`
      sectionHabilidades.innerHTML += habilidad;
      }
    }
  })
}


// //disable desactiva o activa la funcionalizada de un elemento
//   if (boolean == false) {
//     fuego.disabled = false;
//     agua.disabled = false;
//     tierra.disabled = false;
// }

selecHabilidadMaquina = () => {
  let longitudArray = neverwinter[PersonajeAleatorio].habilidades.length
  let AleatorioHabilidad = aleatorio(0, longitudArray-1)
  let nombre = neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].nombre;
  let png = neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].png;
  let efecto = neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].pngEfecto;

  nombreHabilidaMaquina.innerText = nombre
  imagenHabilidaMaquina.innerHTML = `<img src=${png} alt="${nombre}" />`

  // Enfrenramiento();
  // resultadoFinal();
};

crearMensaje = (resultado) => {
  let parrafo = document.createElement("div");
  sectionMensaje.textContent = "";
  parrafo.style.display = "flex";
  parrafo.innerHTML = `<img src="./assets/${habilidadAnfitrion}-efecto.png" alt="${habilidadAnfitrion}" /> <p>${resultado}</p> <img class="rotate" src="./assets/${habilidadMaquina}-efecto.png" alt="${habilidadMaquina}" />`;

  sectionMensaje.appendChild(parrafo);
  vidasRestantes();
};

Enfrenramiento = () => {
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
    derrotas++;
  }
};

resultadoFinal = () => {
  resultados[0].innerText = victorias;
  resultados[1].innerText = derrotas;
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

vidasRestantes = () => {
  document.getElementById("vidad-anfitrion").innerHTML = vidaAnfitrion;
  document.getElementById("vidad-maquina").innerHTML = vidaMaquina;
};

mostrarRutaImagen = (ruta, id) => {
  return (id.innerHTML = `<img src="./assets/${ruta}.png" alt="${ruta}" />`);
};

reiniciarJuego = () => {
  location.reload();
};

window.addEventListener("load", iniciarJuego);
