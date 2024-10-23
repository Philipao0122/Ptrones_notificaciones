  // Función para cargar las notificaciones desde el servidor
  async function cargarNotificaciones() {
    const url = 'http://localhost:5000/notificaciones/usuario2.html'; // Cambia el destinatario según sea necesario
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al cargar las notificaciones');
        }
        const notificaciones = await response.json();
        mostrarNotificaciones(notificaciones);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('notificaciones-list').innerHTML = `<li class="text-red-500">No se pudieron cargar las notificaciones.</li>`;
    }
}

// Función para mostrar las notificaciones en la lista
function mostrarNotificaciones(notificaciones) {
    const lista = document.getElementById('notificaciones-list');
    lista.innerHTML = ''; // Limpiar la lista antes de agregar nuevas notificaciones
    notificaciones.forEach(notificacion => {
        const li = document.createElement('li');
        li.textContent = `${notificacion.fecha}: ${notificacion.nombre} - ${notificacion.mensaje}`;
        lista.appendChild(li);
    });
}

// Cargar las notificaciones al cargar la página
window.onload = cargarNotificaciones;