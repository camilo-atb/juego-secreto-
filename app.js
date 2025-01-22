// Tíutlo
// let titulo = document.querySelector("h1"); // el parametro que recibe el metodo "querySelector", es el selector que vamos a usar
// importante, titulo es un objeto, no un texto; pero, con este objeto podemos hacer diferentes cosas, entre ellas, colocar un texto

// titulo.innerHTML = "Juego del número secreto"; // con innerHTML se asigna el texto

// Parrafo

// let parrafo = document.querySelector("p");

// parrafo.innerHTML = "Indica un número del 1 al 10";

// Función 
let intentos = 0;
let numeroSecreto = 0; // ambito de la variable, en este caso es de alcanza global, la de la funcion es de alcance de bloque // llamamos la función en la variable

let listaNumerosSorteados = [];
let numeroMaximo = 10;

// console.log(numeroSecreto)
function asignarTextoElemento(etiqueta, texto){
    let elementoHTML = document.querySelector(etiqueta);
    elementoHTML.innerHTML = texto;
    return;
}
// tomtamos el valor que se obtiene de la etiqueta input, aunque por medio del ID:
function verificarIntento(){ // declaramos cuando colocamos function; de preferencia, las funciones deben realizar una acción
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value); // el input es una etiqueta que representa a la caja de texto; pero en este caso seleccionaremos por id, por eso ya no usamos querySelector. que sucede?, que este elementById tambien nos devuelve el objeto, y lo que queremos es el valor, por eso accedemos a uno de sus atributos que es el value 
    console.log("Intento " + intentos);
    if(numeroUsuario === numeroSecreto){
        asignarTextoElemento("p", `Acertaste el número en ${intentos} ${(intentos == 1) ? "intento" : "intentos"}`);
        // activamos el boton de nuevo juego:
        document.getElementById("reiniciar").removeAttribute("disabled"); // ingresamos al dom con "document", accedemos a la etiqueta por medio del id, accedemos al metodo para remover atributo, y pasamos por parametro el atributo que deseamos eliminar
    }else{
        // El usuario no acertó
        if (numeroUsuario > numeroSecreto){
            asignarTextoElemento("p", "El número secreto es menor");
        }else{
            asignarTextoElemento("p", "El numero secreto es mayor");
        }
        limpiarCaja(); // llamamos la función que limpia la caja cuando el usuario no acierta   
    }
    intentos ++
    
    return;
}

function generarNumeroSecreto() {
    //let numeroSecreto = Math.floor(Math.random()*10) + 1; // +1 para ir de 1 a 10
    let numeroGenerado = Math.floor(Math.random()*10) + 1;
    //console.log(numeroGenerado)
    // si el número generado esta incluido en la lista hacemos una operación, sino, hacemos otra
    
    // si ya sorteamos todos los números:

    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
    }else{
        if(listaNumerosSorteados.includes(numeroGenerado)){ // con includes, verificamos si el número generado ya esta en la lista o no
            return generarNumeroSecreto(); // recursividad -> la función se llama asi misma
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCaja(){
    // let valorCaja = document.querySelector("#valorUsuario"); // de esta manera se usa el querySelector pero con id (el id de nuestro input)
    // valorCaja.value = ""; // para que quede vacío una vez coloca un valor que no es correcto; recordemos que valorCaja es un objeto, y necesitamos acceder a sus atributos para obtener o modificar el valor

    // Las dos líneas de atras se pueden remplazar por lo siguiente: 
    document.querySelector("#valorUsuario").value = "";
}

function condicionesIniciales(){
    asignarTextoElemento("h1", "Juego del número secreto"); // llamamos a la función // hoisting es que la funcón se puede llamar en cualquier parte, asi sea antes de la creacion de la función
    asignarTextoElemento("p", "Indica un número del 1 al " + numeroMaximo)
    numeroSecreto = generarNumeroSecreto();
    intentos = 1
}

function reiniciarJuego(){
    // Limpiar caja
    limpiarCaja();
    // Mensaje de inicio (intervalo de números)
    condicionesIniciales();
    // Generar número aleatorio
    // Inicializar número de intentos
    // Desabilitar botón de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled", true) // setAttribute es el contrario de remove, y para este caso, setAttribute recibe dos parametros. 
}

condicionesIniciales();

