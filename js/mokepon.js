let habilidadMaquina, habilidadAnfitrion;
let personajeAleatorio;
let vidaMaquina, vidaAnfitrion;
// typeof(elemento) de que tipo es

const sectionAtaque = document.getElementById("seleccionar-ataque");
const sectionMascotas = document.getElementById("seleccionar-mascotas");
const contenedorResultado = document.querySelector(".info-resultado");
const sectionHabilidades = document.getElementById("section-habilidades");
const sectionMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let anchoDelMapa = window.innerWidth;
let altoDelMapa = window.innerHeight;


const buttonReiniciar = document.getElementById("reiniciar");

const imagenPersonajeAnfitrio = document.getElementById("personaje-anfitrion");
const nombrePersonajeAnfitrion = document.getElementById("nombre-personaje");

const imagenPersonajeMaquina = document.getElementById("personaje-maquina");
const nombrePersonajeMaquina = document.getElementById("nombre-mascota-enemigo");

const imagenAtaqueAnfitrion = document.getElementById("img-ataque-anfitrion");

const imagenHabilidaMaquina = document.getElementById("img-ataque-maquina");

let empates = 0,
  victorias = 0,
  derrotas = 0;

let contadorLlamado = 0

const resultados = document.querySelectorAll(".info-resultado span");

const sectionMensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");

let lienzo = mapa.getContext('2d');
let mapaBackground = new Image(); mapaBackground.src = './assets/fondo.jpg';

let imgFlecha = new Image(); imgFlecha.src = './assets/flecha.png';
let IntervalFlecha;
let flechaEnX = mapa.width/2.3, flechaEnY = 150;

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
    this.x = 200;
    this.y = 5;
    this.alto = 130;
    this.ancho = 110;
    this.mapaImagen = new Image();
    this.mapaImagen.src = imagen;

  }
  
  pintarImagen(){
  lienzo.drawImage(
    this.mapaImagen,
    this.x,
    this.y,
    this.ancho,
    this.alto
    )
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

    unirseAlJuego();

  neverwinter.forEach((neverwinter) => {
    opcionNeverwinter = `
    <input type="radio" data-nombre=${neverwinter.nombre} name="neverwinter" id=${neverwinter.nombre} />
    <label class="tarjeta-mokepon" for=${neverwinter.nombre} >
      <img src=${neverwinter.imagen} alt="${neverwinter.nombre}">
      <p>${neverwinter.nombre}</p>
    </label> 
  `;
    contenedorTarjetas.innerHTML += opcionNeverwinter;
  });
  sectionMapa.style.display = 'none';
  sectionAtaque.style.display = "none";
  buttonReiniciar.style.display = "none";
  buttonReiniciar.addEventListener("click", reiniciarJuego);
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#contenedorTarjetas input")) {
    nombrePersonajeAnfitrion.innerText = e.target.dataset.nombre;
    sectionMascotas.style.display = "none";
    dibujarMapa(e.target.dataset.nombre)

    mostrarRutaImagen(e.target.dataset.nombre, imagenPersonajeAnfitrio);
    
    renderizarhabilidades(e.target.dataset.nombre);
    selecPersonajeMaquina();
  }
  if (e.target.matches("#section-habilidades img")) {
    secuenciaSeleccion(e.target.dataset.nombre);
    e.target.parentNode.parentNode.textContent = "";
  }
});

unirseAlJuego = () => {
  fetch('http://localhost:8081/unirse')
    .then((res)=>{
      if(res.ok){
        res.text()
        .then((res)=>{
          console.log(res)
        })
      }
    })
}

renderImagen = (x) =>{
  if (anchoDelMapa > 550){
    mapa.width = anchoDelMapa-500;
    mapa.height = altoDelMapa -80;
    console.log(anchoDelMapa , altoDelMapa)
  }else if (anchoDelMapa < 500){
    mapa.width = anchoDelMapa-30;
    mapa.height = altoDelMapa -150;
  }
  lienzo.clearRect(0, 0, mapa.width, mapa.height )
  
  lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)

  x.pintarImagen()
  revisarColision(x)

    lienzo.drawImage(imgFlecha,flechaEnX,flechaEnY,100,100);
    if(flechaEnY < mapa.height-100){
      flechaEnY +=20
    }
}

dibujarMapa = (personaje) => {
  neverwinter.forEach(x=>{
    if (personaje == x.nombre){
      renderImagen(x)
      eventoTecladoFlechas(x);
    }
  })
  sectionMapa.style.display = 'flex'; 
}

revisarColision = (x) =>{
  mapa.style.border = '3px solid beige'
  if(x.x <= 0 || x.y <=0){
    mapa.style.border = '3px solid red'

  }
  if((x.x+x.ancho) >= mapa.width || (x.y+x.alto)>=mapa.height){
    mapa.style.border = '3px solid red'
    if(x.x >= 180 && x.x <= 210 && (x.y+x.alto) >= mapa.height){
      mapa.style.border = '3px solid blue'

    if(x.y> mapa.height){
      console.log('ok')
      sectionAtaque.style.display = "flex";
      sectionMapa.style.display = 'none'
    }
  }
}
}

eventoTecladoFlechas = (x) => {
  window.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 38 || 87:
        //arriba 
        x.y = x.y - 10
        renderImagen(x)
        break;
      case 40 || 83:
        //abajo
        x.y = x.y + 10
        renderImagen(x)
        break;
      case 37 || 65:
        //izquierda
        x.x = x.x - 10
        renderImagen(x)
        break;
      case 39 || 68:
        //derrecha
        x.x = x.x + 10
        renderImagen(x)
        break;
        default:
          break;
    }
})
}


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
  personajeAleatorio = aleatorio(0, neverwinter.length - 1);
  nombrePersonajeMaquina.innerHTML = neverwinter[personajeAleatorio].nombre;
  imagenPersonajeMaquina.innerHTML = `<img src=${neverwinter[personajeAleatorio].imagen} alt="${neverwinter[personajeAleatorio].nombre}" />`;
  obtenerVidas(neverwinter[personajeAleatorio].nombre, "maquina");
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

crearMensaje = (resultado) => {
  let parrafo = document.createElement("div");
  parrafo.style.display = "flex";
  parrafo.innerHTML = `<img src="./assets/${secuenciaAnfitrion[contadorLlamado]}-efecto.png" alt="${secuenciaAnfitrion[contadorLlamado]}" /> <p>${resultado}</p> <img class="rotate" src="./assets/${secuenciaMaquina[contadorLlamado]}-efecto.png" alt="${secuenciaMaquina[contadorLlamado]}" />`;
  sectionMensaje.appendChild(parrafo);
  contadorLlamado++
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
