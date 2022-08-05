const habilidades = ["FUEGO", "TIERRA", "AGUA"];
let habilidadMaquina, habilidadAnfitrion;

let vidaMaquina = 3, vidaAnfitrion = 3;
// typeof(elemento) de que tipo es 

const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionMascotas = document.getElementById("seleccionar-mascotas");
const contenedorResultado = document.querySelector(".info-resultado");

const buttonReiniciar = document.getElementById("reiniciar");

const imagenPersonajeAnfitrio = document.getElementById("personaje-anfitrion");
const nombrePersonajeAnfitrion = document.getElementById("nombre-personaje");

const imagenPersonajeMaquina = document.getElementById("personaje-maquina");
const nombrePersonajeMaquina = document.getElementById("nombre-mascota-enemigo");

const nombreAtaqueAnfitrion = document.getElementById("nombre-ataque-anfitrion");
const imagenAtaqueAnfitrion = document.getElementById("img-ataque-anfitrion");

const nombreAtaqueMaquina = document.getElementById("nombre-ataque-maquina");
const imagenAtaqueMaquina = document.getElementById("img-ataque-maquina");

let empates = 0,
  victorias = 0,
  derrotas = 0;

const resultados = document.querySelectorAll(".info-resultado span");

const fuego = document.getElementById("button-fuego");
const agua = document.getElementById("button-agua");
const tierra = document.getElementById("button-tierra");

const sectionMensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById('contenedorTarjetas');

let pers;

let neverwinter = [];
let opcionNeverwinter;
class Neverwinter{
    constructor(nombre, imagen, vida, defensa){
      this.nombre = nombre;
      this.imagen = imagen;
      this.ataques = [];
      this.vida = vida;
      this.defensa = defensa;
    }
}
let guldan =  new Neverwinter("Gul'dan","./assets/Gul'dan.png",55,90,80)
let tyrande = new Neverwinter('Tyrande', "./assets/Tyrande.png",90,60,50)
let grommash = new Neverwinter('Grommash',"./assets/Grommash.png",80,70,60)

guldan.ataques.push(
  {nombre: 'Agua', id: 'button-agua'},
  {nombre: 'Agua', id: 'button-agua'},
  {nombre: 'Agua', id: 'button-agua'},
  {nombre: 'Fuego', id: 'button-fuego'},
  {nombre: 'Tierra', id: 'button-tierra'}
)
tyrande.ataques.push(
  {nombre: 'Agua', id: 'button-agua'},
  {nombre: 'Fuego', id: 'button-fuego'},
  {nombre: 'Fuego', id: 'button-fuego'},
  {nombre: 'Fuego', id: 'button-fuego'},
  {nombre: 'Tierra', id: 'button-tierra'}
)
grommash.ataques.push(
  {nombre: 'Agua', id: 'button-agua'},
  {nombre: 'Fuego', id: 'button-fuego'},
  {nombre: 'Tierra', id: 'button-tierra'},
  {nombre: 'Tierra', id: 'button-tierra'},
  {nombre: 'Tierra', id: 'button-tierra'}
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
  selecHabilidad();
  buttonReiniciar.addEventListener("click", reiniciarJuego);

  
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".tarjeta-mokepon img") ) {
    nombrePersonajeAnfitrion.innerText = e.target.dataset.nombre;
    mostrarRutaImagen(e.target.dataset.nombre, imagenPersonajeAnfitrio);
    sectionAtaque.style.display = "flex";
    sectionMascotas.style.display = "none";
    SelecMascMaquina();
  }
});

SelecMascMaquina = () => {
  let num = aleatorio(0, neverwinter.length-1);
  nombrePersonajeMaquina.innerHTML = neverwinter[num].nombre;
  imagenPersonajeMaquina.innerHTML = `<img src=${neverwinter[num].imagen} alt="${neverwinter[num].nombre}" />`;
};

//   //forEach es el metodo de recorrer un arreglo.
//   inputMascotas.forEach(function (valor, indice, inputMascotas) {
//     if (valor.checked == true) {


selecHabilidad = (boolean) => {
  fuego.addEventListener("click", () => {
    habilidadAnfitrion = "FUEGO";
    mostrarRutaImagen("FUEGO", imagenAtaqueAnfitrion);
    nombreAtaqueAnfitrion.innerText = "FUEGO";
    selecHabilidadMaquina();
  });
  agua.addEventListener("click", () => {
    habilidadAnfitrion = "AGUA";
    mostrarRutaImagen("AGUA", imagenAtaqueAnfitrion);
    nombreAtaqueAnfitrion.innerText = "AGUA";
    selecHabilidadMaquina();
  });
  tierra.addEventListener("click", () => {
    habilidadAnfitrion = "TIERRA";
    mostrarRutaImagen("TIERRA", imagenAtaqueAnfitrion);
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
  mostrarRutaImagen(habilidades[num], imagenAtaqueMaquina);
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
  return (id.innerHTML = `<img src="./assets/${ruta}.png" alt="${ruta}" />`);
};

reiniciarJuego = () => {
  location.reload();
};

window.addEventListener("load", iniciarJuego);
