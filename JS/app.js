/*
*JS para la COMPROBACIÓN de daatos de formulario de entrada*/

/*Ininicialiazción de var, objetos, Dom*/
/*
*JS para la COMPROBACIÓN de datos de formulario de entrada
*/

/* Inicialización de variables, objetos, DOM */
var nickInput;
var emailInput;
var formInput;
var error;
var avatarItems;
var itemImg;
var AvatarSelected;

/* Funciones de evento */

/** Comprueba los datos correctos del formulario de entrada
 * @param {eventObject} event Evento que se activa al enviar el formulario
 */
function checkForm(event) {
    // Comprobar si el campo del "nick" es correcto
    if (nickInput.value.match(/^\s*\d/)) {
        console.log("No hay nick válido"); // Si el "nick" empieza con un número o está vacío, muestra un mensaje de error
        event.preventDefault();  // Detenemos el envío del formulario
        nickInput.focus(); // El cursor se coloca en el campo de "nick"
        error.innerText = "El campo de nick no puede empezar por un número ni estar vacío";
        return false; // Se detiene aquí y no sigue si hay error
    }

    // INFO CORRECTA
    // Si todo está bien, continuamos y guardamos los datos
    UserData(nickInput, emailInput, AvatarSelected); // Guardamos la información del usuario
    UserHistoric(nickInput); // Guardamos el "nick" en el historial
    return true; // Todo está correcto, el formulario se puede enviar
}

/* Función para manejar el evento de arrastre */
function movingImg(event) {
    itemImg = event.target; // `event.target` es la imagen que se está arrastrando
    console.log(itemImg.src); // Muestra en la consola la dirección de la imagen
}


function changingImg(event) {
    AvatarSelected.src = itemImg.src;  // Cambia la imagen principal por la imagen que se ha arrastrado
    const selectedAvatarType = itemImg.getAttribute("data-avatar");  // Captura el tipo de avatar usando "data-avatar"
    console.log("Nuevo avatar seleccionado:", selectedAvatarType);

    sessionStorage.setItem("avatarType", selectedAvatarType);  // Guarda el tipo de avatar seleccionado en sessionStorage
}


// Mostrar mensaje inicial al pulsar "JUGAR"
function showMessage(event) {
    event.preventDefault(); // Detener el envío del formulario

    const modal = document.getElementById("messageModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = "¡Prepárate para cazar fantasmas! Tendrás 3 rondas que superar. Según el avatar seleccionado, deberás atrapar tu objeto mágico en la ronda final. ¡Vamos!";
    modal.style.display = "block"; // Mostrar el modal
}

// Continuar al juego
function continueGame() {
    const modal = document.getElementById("messageModal");
    modal.style.display = "none"; // Ocultar el modal

    // Validar los datos del formulario antes de redirigir
    if (checkForm(event)) {
        // Si los datos son correctos, redirigir
        window.location.href = "game.html";
    }
}

// Validación del formulario
function checkForm(event) {
    // Prevenir el envío por defecto
    event.preventDefault();

    // Comprobar si el campo de "nick" está vacío o empieza con un número
    if (!nickInput.value || nickInput.value.match(/^\s*\d/)) {
        error.innerText = "El campo de nick no puede estar vacío ni empezar por un número";
        nickInput.focus(); // Coloca el cursor en el campo de "nick"
        return false; // Detener el proceso
    }

    // Comprobar si hay un avatar seleccionado
    if (!AvatarSelected || AvatarSelected.src.includes("default-avatar.png")) {
        error.innerText = "Debes seleccionar un avatar antes de jugar.";
        return false; // Detener el proceso
    }

    // Si todo está correcto, guarda los datos y permite continuar
    UserData(nickInput, emailInput, AvatarSelected);
    UserHistoric(nickInput);
    return true;
}


// Cargar eventos en el DOM
function domLoaded() {
    console.log("DOM cargado correctamente");

    // Capturar elementos del formulario
    nickInput = document.getElementById("nick");
    emailInput = document.getElementById("email");
    formInput = document.getElementById("enterform");
    error = document.getElementById("error");

    // Evento para el botón "JUGAR"
    const startGameButton = document.getElementById("jugar");
    startGameButton.addEventListener("click", showMessage);

    // Evento para el botón "Continuar"
    const continueButton = document.getElementById("continueButton");
    continueButton.addEventListener("click", continueGame);
}

// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded);
//addEventListener sirve para que el programa espere hasta que el usuario complete 
//el formulario con las funciones de arriba y después ejerza el evento "submit" 

// Asignamos el evento al botón de "Jugar"
document.getElementById("jugar").addEventListener("click", function() {
    showMessage("¡Prepárate para cazar fantasmas! Tendrás 3 rondas que superar. Según el avatar seleccionado, tendrás que atrapar tu objeto mágico en la ronda final. ¡Vamos!");
});

/* Eventos del Drag and Drop */
avatarItems = document.getElementsByClassName("avatarImgItem"); // Obtiene todas las imágenes de los avatares

// Por cada avatar, añade el evento de arrastrar
for (let item of avatarItems) {
    item.addEventListener("dragstart", movingImg); // Cuando empiezas a arrastrar una imagen, se ejecuta `movingImg`
}

// Establece el área del avatar seleccionado
AvatarSelected = document.getElementById("avatarImg"); // Obtiene la imagen del avatar principal
AvatarSelected.addEventListener("dragover", e => { e.preventDefault(); }); // Permite que el avatar principal acepte la imagen arrastrada
AvatarSelected.addEventListener("drop", changingImg); // Cambia la imagen cuando sueltas la nueva imagen sobre el avatar principal

// Ejecutar cuando se cargue el DOM
window.addEventListener("DOMContentLoaded", domLoaded); // Espera hasta que todo el DOM esté disponible
