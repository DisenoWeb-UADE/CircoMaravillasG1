// Inicializa el mapa centrado en una ubicación predeterminada
var map = L.map('map').setView([-34.6037, -58.3816], 5); // Coordenadas iniciales

// Añade el mapa base desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Definir ubicaciones del circo
var ubicaciones = [
    { nombre: "Buenos Aires", coords: [-34.6037, -58.3816], info: "Fechas: 15-20 Noviembre. Entradas desde $500" },
    { nombre: "Córdoba", coords: [-31.4201, -64.1888], info: "Fechas: 25-30 Noviembre. Entradas desde $450" },
    { nombre: "Rosario", coords: [-32.9468, -60.6393], info: "Fechas: 5-10 Diciembre. Entradas desde $400" }
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
