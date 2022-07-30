let nombresMascotas = ["Hipodoge", "Capipepo", "Ratigueya"];
let habilidades = ["FUEGO", "TIERRA", "AGUA"];
let habilidadMaquina, habilidadAnfitrion;
let vidaMaquina = 3, vidaAnfitrion = 3;

let sectionAtaque =  document.getElementById("seleccionar-ataque");
let buttonReiniciar = document.getElementById("reiniciar");
let sectionMascotas = document.getElementById('seleccionar-mascotas')

aleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

iniciarJuego = () => {
  sectionAtaque.style.display = 'none'
  buttonReiniciar.style.display = 'none'
  let buttonMascotas = document.getElementById("button-mascotas");
  buttonMascotas.addEventListener("click", selecMascAnfitrion);
  selecHabilidad();
  buttonReiniciar.addEventListener("click", reiniciarJuego);
  
};

SelecMascMaquina = () => {
  let nombreMascota = document.getElementById("nombre-mascota-enemigo");
  nombreMascota.innerHTML = nombresMascotas[aleatorio(1, 3) - 1];
};

selecMascAnfitrion = () => {
  // querySelectorAll genera un arreglo con todos los elementos similares
  let mascotaSeleccionada = document.getElementById("nombre-mascota");
  let inputMascotas = document.querySelectorAll("#seleccionar-mascotas input");
  let condicional = false;

  //forEach es el metodo de recorrer un arreglo.
  inputMascotas.forEach(function (valor, indice, inputMascotas) {
    if (valor.checked == true) {
      condicional = true;
      alert(`Usted ha seleccionado ${nombresMascotas[indice]}`);
      mascotaSeleccionada.innerText = nombresMascotas[indice];
    }
  });
  if (condicional == false) {
    alert("Debe seleccionar una mascota");
  } else {
    sectionAtaque.style.display = 'block'
    sectionMascotas.style.display = 'none'
    SelecMascMaquina();
  }
};

selecHabilidad = (boolean) => {
  let fuego = document.getElementById("button-fuego");
  let agua = document.getElementById("button-agua");
  let tierra = document.getElementById("button-tierra");
  

  fuego.addEventListener("click", () => {
    habilidadAnfitrion = "FUEGO";
    selecHabilidadMaquina();
  });
  agua.addEventListener("click", () => {
    habilidadAnfitrion = "AGUA";
    selecHabilidadMaquina();
  });
  tierra.addEventListener("click", () => {
    habilidadAnfitrion = "TIERRA";
    selecHabilidadMaquina();
  });
  
    if (boolean == false) {
      fuego.disabled = false; agua.disabled = false; tierra.disabled  = false;
     } else if (boolean == true) {
      fuego.disabled = true;  agua.disabled = true; tierra.disabled  = true;
     }

}

selecHabilidadMaquina = () => {
  habilidadMaquina = habilidades[aleatorio(1, 3) - 1];
  resultadoEnfrenramiento();
  resultadoFinal();
};

crearMensaje = (resultado) => {
  let sectionMensaje = document.getElementById("mensaje");

  let parrafo = document.createElement("p");
  let spanVidaAnfitrion =
    (parrafo.innerHTML = `Tu mascota ataco con ${habilidadAnfitrion}, la mascota del enemigo ataco con ${habilidadMaquina}: ${resultado}`);

  sectionMensaje.appendChild(parrafo);

  vidasRestantes();
};

resultadoEnfrenramiento = () => {
  if (habilidadMaquina == habilidadAnfitrion) {
    crearMensaje("=> EMPATE <=");
  } else if (
    (habilidadAnfitrion == "FUEGO" && habilidadMaquina == habilidades[1]) ||
    (habilidadAnfitrion == "AGUA" && habilidadMaquina == habilidades[0]) ||
    (habilidadAnfitrion == "TIERRA" && habilidadMaquina == habilidades[2])
  ) {
    vidaMaquina = vidaMaquina - 1;
    crearMensaje("=> VIPTORY <=");
  } else {
    vidaAnfitrion = vidaAnfitrion - 1;
    crearMensaje("=> GAME OVER <=");
  }
};
resultadoFinal = () => {
  let sectionMensaje = document.getElementById("mensaje");
  let textFinal = document.createElement("h2");
  if (vidaAnfitrion == 0) {
    textFinal.innerHTML = "=> GAME OVER <= PARTIDA PERTIDA";
    sectionMensaje.appendChild(textFinal);
    selecHabilidad(true);
    buttonReiniciar.style.display = 'block'

  } else if (vidaMaquina == 0) {
    textFinal.innerHTML = "=> VIPTORY <= PARTIDA GANADA";
    sectionMensaje.appendChild(textFinal);
    selecHabilidad(true);
    buttonReiniciar.style.display = 'block'
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

reiniciarJuego = () => {
  location.reload();
};

window.addEventListener("load", iniciarJuego);
