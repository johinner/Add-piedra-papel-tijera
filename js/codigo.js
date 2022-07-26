     // 1 es piedra - 2 papel - 3 tijera
     let triunfos = 0;
     let perdidas = 0;

     aleatorio = (min, max) => {
       return Math.floor(Math.random() * (max - min + 1) + min);
     };

     eleccion = (anfitrion, num) => {
       if (num == 1) {
         return alert(anfitrion + "Piedra");
       } else if (num == 2) {
         return alert(anfitrion + "Papel");
       } else{
         return alert(anfitrion + "Tijera");
       } 
       
     };

     combate = (pc, jugador) => {
       if (pc == jugador) {
         alert("==>EMPATE<==");
       } else if (
         (jugador == 1 && pc == 3) ||
         (jugador == 2 && pc == 1) ||
         (jugador == 3 && pc == 2)
       ) {
         alert("> VIPTORY <");
         triunfos++;
       } else {
         alert("> GAME OVER <");
         perdidas++;
       }
     };
    
     while (triunfos < 3 && perdidas < 3) {
       let jugador = 0;
       let pc = aleatorio(1, 3);
       jugador = prompt("elige: 1 para piedra - 2 para papel - 3 para tijera");
       if(jugador == 1 || jugador == 2 || jugador == 3){
           eleccion("Elegiste ", jugador);
           eleccion("PC Eligio ", pc);
           combate(pc,jugador);  
       }else{
           alert("Opcion no valida");
       }
       
     
     }

     alert(`Ganaste ${triunfos} veces.
Perdiste ${perdidas} veces.`);