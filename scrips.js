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
    // ELECCION DEL ESPECTACULO
    const espectaculos = document.getElementById("espectaculos");
    const espectaculo_elegido = document.getElementById("espectaculo-elegido");
    const espectaculo_titulo = document.getElementById("espectaculo-titulo");
    const espectaculo_desc = document.getElementById("espectaculo-descripcion");
    let espectaculo;

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

    // VALIDACION FECHA CALENDARIO
    let hoy = new Date();
    hoy = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

    document.getElementById("date").value = hoy;
    document.getElementById("date").min = hoy;

    // VARIABLES Y VALIDACION DEL FORMULARIO
    const form = document.getElementById("form-entradas");
    const submit = document.getElementById("form-submit");
    const confirmacion = document.getElementById("toast-success");
    const error = document.getElementById("form-error");
    const quantity4 = document.getElementById("quantity");

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
            }
        }        
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        confirmacion.style.display = "flex";
        window.scrollTo({ top: 830, behavior: 'smooth' });
    })

    // VARIABLES
    // const form = document.getElementById("ticket-form");
    // const summaryText = document.getElementById("summary-text");
    // const summaryText2 = document.getElementById("summary-text-2");
    // const payButton = document.getElementById("pay-button");
    // const noPaymentButton = document.getElementById("no-payment-button");
    // const espectaculos = document.querySelectorAll(".espectaculos");
    // const disabilityBtn = document.getElementById('discapacidad');
    // const disabilityField = document.getElementById('disability-field');
    // const formulario = document.getElementById("probando");
    // const quantity4 = document.getElementById("quantity");
    // // const mailInvalido = document.getElementById('mail-invalido');

    // // PARA QUE SE PUEDA ELEGIR A PARTIR DE LA FECHA DEL MOMENTO
    // document.getElementById("date").value = hoy;
    // document.getElementById("date").min = hoy;

    // // PARA ELEGIR UN ESPECTÁCULO
    // const showChosen = document.getElementById('show-chosen');
    // let show;

    // espectaculos.forEach(espectaculo => {
    //     espectaculo.addEventListener('click', () => {
    //     formulario.style.display = "block";
    //     const chosenId = espectaculo.id;
    //     show = espectaculo.id;
    //     showChosen.textContent = `Entradas para ${chosenId}`;;
        
    //     // RESETEO DE OPCIONES
    //     document.getElementById("city").selectedIndex = null;
    //     document.getElementById("date").selectedIndex = null;
    //     document.getElementById("time").selectedIndex = null;
    //     document.getElementById("category").selectedIndex = null;
    //     document.getElementById("quantity").selectedIndex = null;
    //     summaryText.textContent = "Por favor, completa todos los campos para ver el resumen.";
    //     payButton.disabled = true;
    //     disabilityBtn.checked = false;
    //     disabilityField.classList.add('hidden');
    //     document.getElementById("special-needs").value = "";
    // })});
    
    // // PARA ELEGIR CIUDAD, FECHA, HORARIO, CATEGORÍA Y CANTIDAD DE ENTRADAS
    // form.addEventListener("input", () => {

    //   // SI SE SELECCIONA PACK FAMILIAR, SON 4 ENTRADAS AUTOMÁTICAMENTE
    //   if(category == "Pack Familiar") {
    //     quantity4.setAttribute("value", 4);
    //     quantity4.setAttribute("min", 4);
    //     quantity4.setAttribute("max", 4);
    //   } else {
    //     quantity4.setAttribute("value", 1);
    //     quantity4.setAttribute("min", 1);
    //     quantity4.setAttribute("max", 10);
    //   }

    // //   if(mail !== "" && emailValido(mail)) {
    //     // mailInvalido.style.display = "none";
    //       if (show && city && date && time && category && quantity && mail) {
    //         let costo = costoTotal(category, quantity)

    //         summaryText.textContent = `${show} - ${quantity} entrada/s de categoría ${category} ($${costo})`;
    //         summaryText2.textContent = `${city} - ${date} a las ${time}hs`;
    
    //         payButton.disabled = false;
    //       } else {
    //         summaryText.textContent = "Por favor, completa todos los campos para ver el resumen.";
    //       }
    // //   } else {
    //     // mailInvalido.style.display = "block";
    // //   }
  
    // });
  
    // payButton.addEventListener("click", () => {
    //   alert("Redirigiendo a Mercado Pago...");
    // });

    // // PARA PERSONAS CON DISCAPACIDAD
    // disabilityBtn.addEventListener('change', () => {
    //     if (disabilityField.classList.contains('hidden')) {
    //     disabilityField.classList.remove('hidden');
    //     payButton.style.display = "none";
    //     noPaymentButton.style.display = "block";
    //     } else {
    //     disabilityField.classList.add('hidden');
    //     payButton.style.display = "block";
    //     noPaymentButton.style.display = "none";
    //     }
    // });
    
    // noPaymentButton.addEventListener("click", () => {
    //     sendEmail();
    //     alert("Enviando mail...");
    //   });

    // disabilityField.addEventListener("change", () => {
    //     if(summaryText.textContent !== "Por favor, completa todos los campos para ver el resumen.") {
    //         noPaymentButton.disabled = false;
    //     }
    // });
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


// ENTRADAS
// Papa.parse("entradas.csv", {
//     download: true,
//     header: true,
//     complete: function (results) {
//         const data = results.data;
//         initCompraEntradas(data);
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     // Cargar el archivo CSV
//     Papa.parse("entradas.csv", {
//         download: true,
//         header: true,
//         complete: function (results) {
//             const data = results.data;
//             initCompraEntradas(data);
//         }
//     });
// });

// function initCompraEntradas(data) {
//     const ciudadSelect = document.getElementById("ciudad");
//     const fechaSelect = document.getElementById("fecha");
//     const horarioSelect = document.getElementById("horario");
//     const cantidadInput = document.getElementById("cantidad");
//     const entradasInfo = document.getElementById("entradas-info");

//     // Rellenar el selector de ciudades
//     const ciudades = [...new Set(data.map(item => item.ciudad))];
//     ciudades.forEach(ciudad => {
//         const option = document.createElement("option");
//         option.value = ciudad;
//         option.textContent = ciudad;
//         ciudadSelect.appendChild(option);
//     });

//     // Actualizar fechas según la ciudad seleccionada
//     ciudadSelect.addEventListener("change", () => {
//         fechaSelect.innerHTML = ""; // Limpiar fechas
//         const fechas = [...new Set(data
//             .filter(item => item.ciudad === ciudadSelect.value)
//             .map(item => item.fecha)
//         )];
//         fechas.forEach(fecha => {
//             const option = document.createElement("option");
//             option.value = fecha;
//             option.textContent = fecha;
//             fechaSelect.appendChild(option);
//         });
//     });

//     // Actualizar horarios según la fecha seleccionada
//     fechaSelect.addEventListener("change", () => {
//         horarioSelect.innerHTML = ""; // Limpiar horarios
//         const horarios = data
//             .filter(item => item.ciudad === ciudadSelect.value && item.fecha === fechaSelect.value)
//             .map(item => item.horario);
//         horarios.forEach(horario => {
//             const option = document.createElement("option");
//             option.value = horario;
//             option.textContent = horario;
//             horarioSelect.appendChild(option);
//         });
//     });

//     // Manejar la compra de entradas
//     document.getElementById("comprar").addEventListener("click", () => {
//         const ciudad = ciudadSelect.value;
//         const fecha = fechaSelect.value;
//         const horario = horarioSelect.value;
//         const cantidad = parseInt(cantidadInput.value);

//         // Encontrar el registro en el CSV correspondiente
//         const registro = data.find(item =>
//             item.ciudad === ciudad &&
//             item.fecha === fecha &&
//             item.horario === horario
//         );

//         if (registro) {
//             const asientosDisponibles = parseInt(registro.asientos_disponibles);
//             if (cantidad > asientosDisponibles) {
//                 entradasInfo.innerHTML = `<p style="color: red;">No hay suficientes asientos disponibles.</p>`;
//             } else {
//                 // Actualizar disponibilidad en el registro
//                 registro.asientos_disponibles = asientosDisponibles - cantidad;
//                 entradasInfo.innerHTML = `<p style="color: green;">Compra exitosa. Asientos restantes: ${registro.asientos_disponibles}</p>`;
//             }
//         } else {
//             entradasInfo.innerHTML = `<p style="color: red;">No se pudo completar la compra.</p>`;
//         }
//     });
// }
