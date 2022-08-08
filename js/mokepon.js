let habilidadMaquina, habilidadAnfitrion;
let PersonajeAleatorio;
let vidaMaquina, vidaAnfitrion;
// typeof(elemento) de que tipo es

const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionMascotas = document.getElementById("seleccionar-mascotas");
const contenedorResultado = document.querySelector(".info-resultado");
const sectionHabilidades = document.getElementById("section-habilidades");

const buttonReiniciar = document.getElementById("reiniciar");

const imagenPersonajeAnfitrio = document.getElementById("personaje-anfitrion");
const nombrePersonajeAnfitrion = document.getElementById("nombre-personaje");

const imagenPersonajeMaquina = document.getElementById("personaje-maquina");
const nombrePersonajeMaquina = document.getElementById(
  "nombre-mascota-enemigo"
);

const imagenAtaqueAnfitrion = document.getElementById("img-ataque-anfitrion");

const imagenHabilidaMaquina = document.getElementById("img-ataque-maquina");

let empates = 0,
  victorias = 0,
  derrotas = 0;

let contadorYamado = 0

const resultados = document.querySelectorAll(".info-resultado span");

const sectionMensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let pers;
let secuenciaAnfitrion = [];
let secuenciaMaquina = [];
let copiaHabilidades = [];

let neverwinter = [];
let opcionNeverwinter;
let habilidad;
class Neverwinter {
  constructor(nombre, imagen, vida, defensa) {
    this.nombre = nombre;
    this.imagen = imagen;
    this.habilidades = [];
    this.vida = vida;
    this.defensa = defensa;
  }
}
let guldan = new Neverwinter("Gul'dan", "./assets/Gul'dan.png", 90, 80);
let tyrande = new Neverwinter("Tyrande", "./assets/Tyrande.png", 60, 50);
let grommash = new Neverwinter("Grommash", "./assets/Grommash.png", 70, 60);

guldan.habilidades.push(
  {
    nombre: "Agua",
    png: "./assets/Agua.png",
    pngEfecto: "./assets/Agua-efecto.png",
  },
  {
    nombre: "Agua",
    png: "./assets/Agua.png",
    pngEfecto: "./assets/Agua-efecto.png",
  },
  {
    nombre: "Agua",
    png: "./assets/Agua.png",
    pngEfecto: "./assets/Agua-efecto.png",
  },
  {
    nombre: "Fuego",
    png: "./assets/Fuego.png",
    pngEfecto: "./assets/Fuego-efecto.png",
  },
  {
    nombre: "Tierra",
    png: "./assets/Tierra.png",
    pngEfecto: "./assets/Tierra-efecto.png",
  }
);
tyrande.habilidades.push(
  {
    nombre: "Fuego",
    png: "./assets/Fuego.png",
    pngEfecto: "./assets/Fuego-efecto.png",
  },
  {
    nombre: "Fuego",
    png: "./assets/Fuego.png",
    pngEfecto: "./assets/Fuego-efecto.png",
  },
  {
    nombre: "Fuego",
    png: "./assets/Fuego.png",
    pngEfecto: "./assets/Fuego-efecto.png",
  },
  {
    nombre: "Tierra",
    png: "./assets/Tierra.png",
    pngEfecto: "./assets/Tierra-efecto.png",
  },
  {
    nombre: "Agua",
    png: "./assets/Agua.png",
    pngEfecto: "./assets/Agua-efecto.png",
  }
);
grommash.habilidades.push(
  {
    nombre: "Agua",
    png: "./assets/Agua.png",
    pngEfecto: "./assets/Agua-efecto.png",
  },
  {
    nombre: "Fuego",
    png: "./assets/Fuego.png",
    pngEfecto: "./assets/Fuego-efecto.png",
  },
  {
    nombre: "Tierra",
    png: "./assets/Tierra.png",
    pngEfecto: "./assets/Tierra-efecto.png",
  },
  {
    nombre: "Tierra",
    png: "./assets/Tierra.png",
    pngEfecto: "./assets/Tierra-efecto.png",
  },
  {
    nombre: "Tierra",
    png: "./assets/Tierra.png",
    pngEfecto: "./assets/Tierra-efecto.png",
  }
);

neverwinter.push(guldan, tyrande, grommash);

aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

iniciarJuego = () => {
  neverwinter.forEach((neverwinter) => {
    opcionNeverwinter = `
    <input type="radio" name="neverwinter" id=${neverwinter.nombre} />
    <label class="tarjeta-mokepon" for=${neverwinter.nombre} >
      <img src=${neverwinter.imagen} alt="${neverwinter.nombre}" data-nombre=${neverwinter.nombre}>
      <p>${neverwinter.nombre}</p>
    </label> 
  `;
    contenedorTarjetas.innerHTML += opcionNeverwinter;
  });
  sectionAtaque.style.display = "none";
  buttonReiniciar.style.display = "none";
  buttonReiniciar.addEventListener("click", reiniciarJuego);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".tarjeta-mokepon img")) {
    nombrePersonajeAnfitrion.innerText = e.target.dataset.nombre;
    mostrarRutaImagen(e.target.dataset.nombre, imagenPersonajeAnfitrio);

    sectionAtaque.style.display = "flex";
    sectionMascotas.style.display = "none";
    renderizarhabilidades(e.target.dataset.nombre);
    selecPersonajeMaquina();
  }
  if (e.target.matches("#section-habilidades img")) {
    secuenciaSeleccion(e.target.dataset.nombre);
    e.target.parentNode.parentNode.textContent = "";
  }
});

secuenciaSeleccion = (ataque) => {
  secuenciaAnfitrion.push(ataque);
  if (secuenciaAnfitrion.length == 5) {
    renderizarAtaquesSelecionados(secuenciaAnfitrion, imagenAtaqueAnfitrion);
    secuenciaAleatoria();
  }
};

secuenciaAleatoria = () => {
  neverwinter.forEach((datos) => {
    if (datos.nombre == nombrePersonajeMaquina.textContent) {
      for (x of datos.habilidades) {
        secuenciaMaquina.push(x.nombre);
      }
      secuenciaMaquina = secuenciaMaquina.sort(() => {
        return Math.random() - 0.5;
      });
    }
  });
  renderizarAtaquesSelecionados(secuenciaMaquina, imagenHabilidaMaquina);
  Enfrenramiento()
};

renderizarAtaquesSelecionados = (array, id) => {
  for (x of array) {
    id.innerHTML += `<img src="./assets/${x}.png" alt="${x}" />`;
  }
};

obtenerVidas = (personaje, peticion) => {
  neverwinter.forEach((datos) => {
    if (datos.nombre == personaje) {
      if (peticion == "anfitrion") {
      } else if (peticion == "maquina") {
      }
    }
  });
};

selecPersonajeMaquina = () => {
  PersonajeAleatorio = aleatorio(0, neverwinter.length - 1);
  nombrePersonajeMaquina.innerHTML = neverwinter[PersonajeAleatorio].nombre;
  imagenPersonajeMaquina.innerHTML = `<img src=${neverwinter[PersonajeAleatorio].imagen} alt="${neverwinter[PersonajeAleatorio].nombre}" />`;
  obtenerVidas(neverwinter[PersonajeAleatorio].nombre, "maquina");
};

renderizarhabilidades = (personaje) => {
  neverwinter.forEach((neverwinter) => {
    if (personaje == neverwinter.nombre) {
      for (x of neverwinter.habilidades) {
        habilidad = `<div>
        <p>${x.nombre}</p>
        <button>
          <img src=${x.png} alt=${x.nombre} data-nombre=${x.nombre}>
        </button>
      </div>`;
        sectionHabilidades.innerHTML += habilidad;
      }
    }
  });
};
//ID.checked == true)
//     ID.disabled = false;
selecHabilidadMaquina = () => {
  let longitudArray = neverwinter[PersonajeAleatorio].habilidades.length;
  let AleatorioHabilidad = aleatorio(0, longitudArray - 1);
  let nombre =
    neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].nombre;
  let png = neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].png;
  let efecto =
    neverwinter[PersonajeAleatorio].habilidades[AleatorioHabilidad].pngEfecto;

  imagenHabilidaMaquina.innerHTML = `<img src=${png} alt="${nombre}" />`;
};

crearMensaje = (resultado) => {
  let parrafo = document.createElement("div");
  parrafo.style.display = "flex";
  parrafo.innerHTML = `<img src="./assets/${secuenciaAnfitrion[contadorYamado]}-efecto.png" alt="${secuenciaAnfitrion[contadorYamado]}" /> <p>${resultado}</p> <img class="rotate" src="./assets/${secuenciaMaquina[contadorYamado]}-efecto.png" alt="${secuenciaMaquina[contadorYamado]}" />`;
  sectionMensaje.appendChild(parrafo);
  contadorYamado++
};

Enfrenramiento = () => {
  for (let i = 0; i < secuenciaAnfitrion.length; i++) {
    if (secuenciaMaquina[i] == secuenciaAnfitrion[i]) {
      crearMensaje("EMPATE");
      empates++;
    } else if (
      (secuenciaMaquina[i] == "Fuego" && secuenciaAnfitrion[i] == "Agua") ||
      (secuenciaMaquina[i] == "Tierra" && secuenciaAnfitrion[i] == "Fuego") ||
      (secuenciaMaquina[i] == "Agua" && secuenciaAnfitrion[i] == "Tierra")
    ){
      crearMensaje("VICTORIA");
      victorias++;
    }else{
      crearMensaje("DERROTA");
      derrotas++;
    }
  }
  resultadoFinal()
};

resultadoFinal = () => {
  resultados[0].innerText = victorias;
  resultados[1].innerText = derrotas;
  resultados[2].innerText = empates;

  if (derrotas > victorias) {
    resultado.innerText = "=> GAME OVER <=";
  } else if (victorias > derrotas) {
    resultado.innerText = "=> VIPTORY <=";
  }else{
    resultado.innerText = "=> EMPATE <=";
  }
  buttonReiniciar.style.display = "flex";
  contenedorResultado.style.display = "block";
};

mostrarRutaImagen = (ruta, id) => {
  return (id.innerHTML = `<img src="./assets/${ruta}.png" alt="${ruta}" />`);
};

reiniciarJuego = () => {
  location.reload();
};

window.addEventListener("load", iniciarJuego);
