// VALIDACION PARA EL MAIL
function emailValido(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// VALIDACION NUMEROS
function soloNumeros(cantidad) {
    let error = true;
    let numeros = /^[0-9]*$/;

    if(!numeros.test(cantidad)) error = false;

    return error;
}

// function costoTotal(categoria, cantidad) {
//     let costo;
    
//     switch(categoria) {
//         case "Normal":
//             costo = cantidad * 20000;
//             break;

//         case "Pack Familiar":
//             costo = 70000;
//             break;
        
//         case "Meet & Greet":
//             costo = cantidad * 50000;
//             break;

//         case "VIP":
//             costo = cantidad * 100000;
//             break;

//         default:
//             costo = 0;
//             break;
//     }

//     return costo;
// }


//ESPECTACULOS
let payasoDeFuego = "Payaso de Fuego";
let payasoDeFuego_desc = "Combina humor y destreza mientras realiza impresionantes malabares con fuego. Sus rutinas están llenas de chistes, acrobacias y momentos que dejan al público al borde de sus asientos, ¡todo con un toque de magia ardiente que ilumina la pista! Ideal para toda la familia, su show promete risas y asombro en partes iguales.";
let lunaYSol = "Luna y Sol"; 
let lunaYSol_desc = "Este dúo deslumbra con su elegancia y fuerza mientras realizan increíbles acrobacias en un aro aéreo. Su espectáculo combina gracia y sincronización, dejando al público maravillado en cada giro y pirueta."; 
let equilibrioSupremo = "Equilibrio Supremo";
let equilibrioSupremo_desc = "Un espectáculo que desafía los límites de la destreza humana. Un equilibrista avanza con firmeza sobre una cuerda floja, mientras sostiene a otra persona que realiza elegantes movimientos, creando una escena de riesgo y belleza única. Este número es un verdadero acto de coordinación, fuerza y precisión que mantiene al público asombrado con cada paso.";
let losVoladores = "Los Voladores";
let losVoladores_desc = "Un equipo de acróbatas se apodera del centro de la carpa con una energía arrolladora. En perfecta sincronía, ejecutan acrobacias en el aire, giros imposibles y saltos que dejan sin aliento a grandes y chicos. Su espectáculo combina fuerza, agilidad y carisma, creando un torbellino de emociones que transforma el escenario en un lugar mágico y lleno de adrenalina.";

document.addEventListener("DOMContentLoaded", () => {
    // <----- CONTACTO ----->
    const contact_mail = document.getElementById("contact-mail");
    const contact_error = document.getElementById("contact-error");
    const contact_form = document.getElementById("contact-form");
    const contact_confirmacion = document.getElementById("contact-toast-success");
    const contact_submit = document.getElementById("contact-submit");

    if(contact_mail) {
        contact_mail.addEventListener("input", (e) => {
            if(!emailValido(e.target.value)) {
                contact_error.style.display = "block";
                contact_submit.disabled = true;
            } else {
                contact_error.style.display = "none";
                contact_submit.disabled = false;
            }
        })
    }

    if(contact_form) {
        contact_form.addEventListener("submit", (e) => {
            e.preventDefault();

            contact_confirmacion.style.display = "flex";
            window.scrollTo({ top: 830, behavior: 'smooth' });
        })
    }

    // <----- ENTRADAS ----->
    
    // ELECCION DEL ESPECTACULO
    const espectaculos = document.getElementById("espectaculos");
    const espectaculo_elegido = document.getElementById("espectaculo-elegido");
    const espectaculo_titulo = document.getElementById("espectaculo-titulo");
    const espectaculo_desc = document.getElementById("espectaculo-descripcion");
    let espectaculo;

    if(espectaculos) {
        espectaculos.addEventListener("change", (e) => {
            espectaculo = e.target.value;
    
            switch(e.target.value) {
                case "Payaso de Fuego":
                    espectaculo_elegido.style.display = "flex";
                    espectaculo_titulo.innerHTML = payasoDeFuego;
                    espectaculo_desc.innerHTML = payasoDeFuego_desc;
                    break;
    
                case "Luna y Sol":
                    espectaculo_elegido.style.display = "flex";
                    espectaculo_titulo.innerHTML = lunaYSol;
                    espectaculo_desc.innerHTML = lunaYSol_desc;
                    break;
    
                case "Equilibrio Supremo":
                    espectaculo_elegido.style.display = "flex";
                    espectaculo_titulo.innerHTML = equilibrioSupremo;
                    espectaculo_desc.innerHTML = equilibrioSupremo_desc;
                    break;
    
                case "Los Voladores":
                    espectaculo_elegido.style.display = "flex";
                    espectaculo_titulo.innerHTML = losVoladores;
                    espectaculo_desc.innerHTML = losVoladores_desc;
                    break;
    
                default:
                    espectaculo_elegido.style.display = "none";
                    break;
            }
        })
    }

    // VALIDACION FECHA CALENDARIO
    let hoy = new Date();
    hoy = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    let date = document.getElementById("date");

    if(date) {
        date.value = hoy;
        date.min = hoy;
    }

    // VARIABLES Y VALIDACION DEL FORMULARIO
    const form = document.getElementById("form-entradas");
    const resumen = document.getElementById("resumen");
    const discapacidad = document.getElementById("discapacidad");
    const informacion_adicional = document.getElementById("informacion-adicional");
    const svg = document.getElementById("svg");
    const submit = document.getElementById("form-submit");
    const continuacion = document.getElementById("continuacion");
    const btn_confirmacion = document.getElementById("boton-confirmacion");
    const btn_arrepentimiento = document.getElementById("boton-arrepentimiento");
    const confirmacion = document.getElementById("toast-success");
    const error = document.getElementById("form-error");
    const quantity4 = document.getElementById("quantity");

    if(form) {
        form.addEventListener("input", () => {
            const city = document.getElementById("city").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const category = document.getElementById("category").value;
            const quantity = document.getElementById("quantity").value;
            const mail = document.getElementById("mail").value;
    
            // SI SE SELECCIONA PACK FAMILIAR, SON 4 ENTRADAS AUTOMÁTICAMENTE
            if(category == "Pack Familiar") {
                quantity4.setAttribute("value", 4);
                quantity4.setAttribute("min", 4);
                quantity4.setAttribute("max", 4);
            } else {
                quantity4.setAttribute("value", 1);
                quantity4.setAttribute("min", 1);
                quantity4.setAttribute("max", 10);
            }
    
            if(espectaculo && city && date && category && quantity && time && mail) {
                if(!soloNumeros(quantity)) {
                    error.innerHTML = "La cantidad de entradas debe ser entre 1 y 10";
                    submit.disabled = true;
                } else if(!emailValido(mail)) {
                    error.innerText = "Ingrese una dirección de mail correcta";
                    submit.disabled = true;
                } else {
                    error.innerText = "";
                    submit.disabled = false;
                    resumen.innerText = `Estas por comprar ${quantity} entrada/s de categoría ${category} para ver ${espectaculo} el ${date} las ${time}hs en nuestro teatro de ${city} ¿Querés continuar con la compra?`
                }
            }        
        })
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
    
            if(submit.innerText == "Ir a pagar") {
                continuacion.style.display = "flex";
            } else {
                confirmacion.style.display = "flex";
                window.scrollTo({ top: 830, behavior: 'smooth' });
            }
        })
    }

    if(btn_confirmacion && btn_arrepentimiento) {
        btn_confirmacion.addEventListener("click", () => {
            continuacion.style.display = "none";
            confirmacion.style.display = "flex";
            window.scrollTo({ top: 830, behavior: 'smooth' });
        });

        btn_arrepentimiento.addEventListener("click", () => {
            location.reload();
        })
    }

    if(discapacidad) {
        discapacidad.addEventListener("change", (e) => {
            if(e.target.checked) {
                informacion_adicional.style.display = "block";
                svg.style.display = "none";
                submit.innerText = "Enviar confirmación al mail";
    
            } else {
                informacion_adicional.style.display = "none";
                svg.style.display = "block";
                submit.innerText = "Ir a pagar";
            }
        })
    }
});


// Inicializa el mapa centrado en una ubicación predeterminada
var map = L.map('map').setView([-34.6037, -58.3816], 5); // Coordenadas iniciales

// Añade el mapa base desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Definir ubicaciones del circo
var ubicaciones = [
    { nombre: "Buenos Aires (CABA)", coords: [-34.6037, -58.3816], info: "Fechas: 15-20 Noviembre. Entradas desde $500" },
    { nombre: "La Plata", coords: [-34.9214, -57.9544], info: "Fechas: 22-27 Noviembre. Entradas desde $450" },
    { nombre: "Lomas de Zamora", coords: [-34.757, -58.4063], info: "Fechas: 6-11 Diciembre. Entradas desde $400" },
    { nombre: "San Isidro", coords: [-34.4721, -58.5272], info: "Fechas: 13-18 Diciembre. Entradas desde $450" },
    { nombre: "Rosario", coords: [-32.9468, -60.6393], info: "Fechas: 20-25 Diciembre. Entradas desde $400" },
    { nombre: "Santa Fe", coords: [-31.6239, -60.6995], info: "Fechas: 27 Diciembre - 1 Enero. Entradas desde $350" },
    { nombre: "Mar del Plata", coords: [-38.0055, -57.5426], info: "Fechas: 3-8 Enero. Entradas desde $500" },
    { nombre: "Tandil", coords: [-37.3216, -59.1332], info: "Fechas: 17-22 Enero. Entradas desde $400" },
    { nombre: "Salta", coords: [-24.7821, -65.4232], info: "Fechas: 24-29 Enero. Entradas desde $500" },
    { nombre: "Tucumán", coords: [-26.8083, -65.2176], info: "Fechas: 7-12 Febrero. Entradas desde $400" },
    { nombre: "Posadas", coords: [-27.3671, -55.8961], info: "Fechas: 21-26 Febrero. Entradas desde $400" },
    { nombre: "Mendoza", coords: [-32.8908, -68.8272], info: "Fechas: 28 Febrero - 5 Marzo. Entradas desde $500" },
    { nombre: "Bariloche", coords: [-41.1335, -71.3103], info: "Fechas: 21-26 Marzo. Entradas desde $500" },
    { nombre: "Villa Carlos Paz", coords: [-31.4207, -64.4991], info: "Fechas: 2-7 Mayo. Entradas desde $400" }
];

// Función para actualizar la información de entradas según la ubicación
function mostrarEntradas(info) {
    document.getElementById("entradas-info").innerHTML = `<p>${info}</p>`;
}

// Añadir marcadores al mapa
ubicaciones.forEach(lugar => {
    var marker = L.marker(lugar.coords).addTo(map);
    marker.bindPopup(`<b>${lugar.nombre}</b><br>`);

    // Mostrar información de entradas al hacer clic en el marcador
    // marker.on("click", () => mostrarEntradas(lugar.info));
});
