// VALIDACION PARA EL MAIL
// function emailValido(email) {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return regex.test(email);
// }

// CALENDARIO FECHA
document.addEventListener("DOMContentLoaded", () => {
    // VARIABLES
    const form = document.getElementById("ticket-form");
    const summaryText = document.getElementById("summary-text");
    const payButton = document.getElementById("pay-button");
    const noPaymentButton = document.getElementById("no-payment-button");
    const espectaculos = document.querySelectorAll(".espectaculos");
    const disabilityBtn = document.getElementById('discapacidad');
    const disabilityField = document.getElementById('disability-field');
    const formulario = document.getElementById("probando");
    // const mailInvalido = document.getElementById('mail-invalido');
    let hoy = new Date();
    hoy = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();

    // PARA QUE SE PUEDA ELEGIR A PARTIR DE LA FECHA DEL MOMENTO
    document.getElementById("date").value = hoy;
    document.getElementById("date").min = hoy;

    // PARA ELEGIR UN ESPECTÁCULO
    const showChosen = document.getElementById('show-chosen');
    let show;

    espectaculos.forEach(espectaculo => {
        espectaculo.addEventListener('click', () => {
        formulario.style.display = "block";
        const chosenId = espectaculo.id;
        show = espectaculo.id;
        showChosen.textContent = `Entradas para ${chosenId}`;;
        
        // RESETEO DE OPCIONES
        document.getElementById("city").selectedIndex = null;
        document.getElementById("date").selectedIndex = null;
        document.getElementById("time").selectedIndex = null;
        document.getElementById("category").selectedIndex = null;
        document.getElementById("quantity").selectedIndex = null;
        summaryText.textContent = "Por favor, completa todos los campos para ver el resumen.";
        payButton.disabled = true;
        disabilityBtn.checked = false;
        disabilityField.classList.add('hidden');
        document.getElementById("special-needs").value = "";
    })});
    
    // PARA ELEGIR CIUDAD, FECHA, HORARIO, CATEGORÍA Y CANTIDAD DE ENTRADAS
    form.addEventListener("input", () => {
      const city = document.getElementById("city").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const category = document.getElementById("category").value;
      const quantity = document.getElementById("quantity").value;
      const mail = document.getElementById("mail").value;
    
    //   if(!!mail && emailValido(mail)) {
          if (show && city && date && time && category && quantity && mail) {
            summaryText.textContent = `
              Espectáculo: ${show}
              Ciudad: ${city}
              Fecha: ${date}
              Horario: ${time}
              Categoría: ${category}
              Cantidad: ${quantity}
            `;
    
            payButton.disabled = false;
          } else {
            summaryText.textContent = "Por favor, completa todos los campos para ver el resumen.";
          }
    //   } else {
    //     mailInvalido.style.display = "block";
    //   }
  
    });
  
    payButton.addEventListener("click", () => {
      alert("Redirigiendo a Mercado Pago...");
    });

    // PARA PERSONAS CON DISCAPACIDAD
    disabilityBtn.addEventListener('change', () => {
        if (disabilityField.classList.contains('hidden')) {
        disabilityField.classList.remove('hidden');
        payButton.style.display = "none";
        noPaymentButton.style.display = "block";
        } else {
        disabilityField.classList.add('hidden');
        payButton.style.display = "block";
        noPaymentButton.style.display = "none";
        }
    });

    noPaymentButton.addEventListener("click", () => {
        alert("Enviando mail...");
      });

    disabilityField.addEventListener("change", () => {
        if(summaryText.textContent !== "Por favor, completa todos los campos para ver el resumen.") {
            noPaymentButton.disabled = false;
        }
    });
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
    { nombre: "Avellaneda", coords: [-34.6624, -58.3645], info: "Fechas: 29 Noviembre - 4 Diciembre. Entradas desde $400" },
    { nombre: "Lomas de Zamora", coords: [-34.757, -58.4063], info: "Fechas: 6-11 Diciembre. Entradas desde $400" },
    { nombre: "San Isidro", coords: [-34.4721, -58.5272], info: "Fechas: 13-18 Diciembre. Entradas desde $450" },
    { nombre: "Rosario", coords: [-32.9468, -60.6393], info: "Fechas: 20-25 Diciembre. Entradas desde $400" },
    { nombre: "Santa Fe", coords: [-31.6239, -60.6995], info: "Fechas: 27 Diciembre - 1 Enero. Entradas desde $350" },
    { nombre: "Mar del Plata", coords: [-38.0055, -57.5426], info: "Fechas: 3-8 Enero. Entradas desde $500" },
    { nombre: "Bahía Blanca", coords: [-38.7196, -62.2724], info: "Fechas: 10-15 Enero. Entradas desde $450" },
    { nombre: "Tandil", coords: [-37.3216, -59.1332], info: "Fechas: 17-22 Enero. Entradas desde $400" },
    { nombre: "Salta", coords: [-24.7821, -65.4232], info: "Fechas: 24-29 Enero. Entradas desde $500" },
    { nombre: "San Salvador de Jujuy", coords: [-24.1858, -65.2995], info: "Fechas: 31 Enero - 5 Febrero. Entradas desde $450" },
    { nombre: "Tucumán", coords: [-26.8083, -65.2176], info: "Fechas: 7-12 Febrero. Entradas desde $400" },
    { nombre: "Resistencia", coords: [-27.4515, -58.9868], info: "Fechas: 14-19 Febrero. Entradas desde $350" },
    { nombre: "Posadas", coords: [-27.3671, -55.8961], info: "Fechas: 21-26 Febrero. Entradas desde $400" },
    { nombre: "Mendoza", coords: [-32.8908, -68.8272], info: "Fechas: 28 Febrero - 5 Marzo. Entradas desde $500" },
    { nombre: "San Juan", coords: [-31.5375, -68.5364], info: "Fechas: 7-12 Marzo. Entradas desde $450" },
    { nombre: "San Luis", coords: [-33.3014, -66.3378], info: "Fechas: 14-19 Marzo. Entradas desde $400" },
    { nombre: "Bariloche", coords: [-41.1335, -71.3103], info: "Fechas: 21-26 Marzo. Entradas desde $500" },
    { nombre: "Neuquén", coords: [-38.9516, -68.0591], info: "Fechas: 28 Marzo - 2 Abril. Entradas desde $450" },
    { nombre: "Comodoro Rivadavia", coords: [-45.8649, -67.4828], info: "Fechas: 4-9 Abril. Entradas desde $400" },
    { nombre: "Ushuaia", coords: [-54.8019, -68.303], info: "Fechas: 11-16 Abril. Entradas desde $500" },
    { nombre: "Río Gallegos", coords: [-51.6231, -69.2168], info: "Fechas: 18-23 Abril. Entradas desde $450" },
    { nombre: "Córdoba", coords: [-31.4201, -64.1888], info: "Fechas: 25-30 Abril. Entradas desde $450" },
    { nombre: "Villa Carlos Paz", coords: [-31.4207, -64.4991], info: "Fechas: 2-7 Mayo. Entradas desde $400" },
    { nombre: "Río Cuarto", coords: [-33.1232, -64.3494], info: "Fechas: 9-14 Mayo. Entradas desde $350" },
    { nombre: "Paraná", coords: [-31.7319, -60.5238], info: "Fechas: 16-21 Mayo. Entradas desde $400" },
    { nombre: "Gualeguaychú", coords: [-33.0096, -58.5172], info: "Fechas: 23-28 Mayo. Entradas desde $350" }
];

// Función para actualizar la información de entradas según la ubicación
function mostrarEntradas(info) {
    document.getElementById("entradas-info").innerHTML = `<p>${info}</p>`;
}

// Añadir marcadores al mapa
ubicaciones.forEach(lugar => {
    var marker = L.marker(lugar.coords).addTo(map);
    marker.bindPopup(`<b>${lugar.nombre}</b><br>Haz clic para ver entradas.`);

    // Mostrar información de entradas al hacer clic en el marcador
    marker.on("click", () => mostrarEntradas(lugar.info));
});


// ENTRADAS
Papa.parse("entradas.csv", {
    download: true,
    header: true,
    complete: function (results) {
        const data = results.data;
        initCompraEntradas(data);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Cargar el archivo CSV
    Papa.parse("entradas.csv", {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            initCompraEntradas(data);
        }
    });
});

function initCompraEntradas(data) {
    const ciudadSelect = document.getElementById("ciudad");
    const fechaSelect = document.getElementById("fecha");
    const horarioSelect = document.getElementById("horario");
    const cantidadInput = document.getElementById("cantidad");
    const entradasInfo = document.getElementById("entradas-info");

    // Rellenar el selector de ciudades
    const ciudades = [...new Set(data.map(item => item.ciudad))];
    ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
    });

    // Actualizar fechas según la ciudad seleccionada
    ciudadSelect.addEventListener("change", () => {
        fechaSelect.innerHTML = ""; // Limpiar fechas
        const fechas = [...new Set(data
            .filter(item => item.ciudad === ciudadSelect.value)
            .map(item => item.fecha)
        )];
        fechas.forEach(fecha => {
            const option = document.createElement("option");
            option.value = fecha;
            option.textContent = fecha;
            fechaSelect.appendChild(option);
        });
    });

    // Actualizar horarios según la fecha seleccionada
    fechaSelect.addEventListener("change", () => {
        horarioSelect.innerHTML = ""; // Limpiar horarios
        const horarios = data
            .filter(item => item.ciudad === ciudadSelect.value && item.fecha === fechaSelect.value)
            .map(item => item.horario);
        horarios.forEach(horario => {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    });

    // Manejar la compra de entradas
    document.getElementById("comprar").addEventListener("click", () => {
        const ciudad = ciudadSelect.value;
        const fecha = fechaSelect.value;
        const horario = horarioSelect.value;
        const cantidad = parseInt(cantidadInput.value);

        // Encontrar el registro en el CSV correspondiente
        const registro = data.find(item =>
            item.ciudad === ciudad &&
            item.fecha === fecha &&
            item.horario === horario
        );

        if (registro) {
            const asientosDisponibles = parseInt(registro.asientos_disponibles);
            if (cantidad > asientosDisponibles) {
                entradasInfo.innerHTML = `<p style="color: red;">No hay suficientes asientos disponibles.</p>`;
            } else {
                // Actualizar disponibilidad en el registro
                registro.asientos_disponibles = asientosDisponibles - cantidad;
                entradasInfo.innerHTML = `<p style="color: green;">Compra exitosa. Asientos restantes: ${registro.asientos_disponibles}</p>`;
            }
        } else {
            entradasInfo.innerHTML = `<p style="color: red;">No se pudo completar la compra.</p>`;
        }
    });
}
