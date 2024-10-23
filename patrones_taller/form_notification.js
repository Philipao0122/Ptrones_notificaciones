function mostrarFormulario() {
    const formContainer = document.getElementById('formulario-container');
    const formulario = `
      <div class="bg-white p-6 rounded-md shadow-lg max-w-lg mx-auto mt-6">
        <h2 class="text-2xl font-bold mb-4">Crear Notificación</h2>
        <form id="crearNotificacionForm">
          <div class="mb-4">
            <label for="Asunto" class="block text-gray-700 font-semibold">Asunto</label>
            <input type="text" id="Asunto" name="Asunto" class="w-full mt-1 p-2 border border-gray-300 rounded-md" required>
          </div>
          <div class="mb-4">
            <label for="mensaje" class="block text-gray-700 font-semibold">Mensaje de notificación:</label>
            <textarea id="mensaje" name="mensaje" class="w-full mt-1 p-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="destinatario" class="block text-gray-700 font-semibold">Seleccionar destinatario:</label>
            <select id="destinatario" name="destinatario" class="w-full mt-1 p-2 border border-gray-300 rounded-md" required>
                <option value="usuario1.html">Juan</option>
                <option value="usuario2.html">Ana</option>
                <option value="usuario3.html">Luis</option>
            </select>
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Crear Notificación</button>
        </form>
      </div>
    `;
  
    formContainer.innerHTML = formulario;
  
    document.getElementById('crearNotificacionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const Asunto = document.getElementById('Asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        const destinatario = document.getElementById('destinatario').value; // Obtener el destinatario
        
        if (Asunto && mensaje && destinatario) {
            enviarNotificacion(Asunto, mensaje, destinatario); // Pasar el destinatario también
        } else {
            alert("Por favor, completa todos los campos");
        }
    });
    
    function enviarNotificacion(Asunto, mensaje, destinatario) {
        const notificacionData = {
            Asunto,
            mensaje,
            destinatario // Incluir destinatario en los datos
        };
    
        fetch('http://localhost:5000/crear_notificacion', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notificacionData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            const notificacion = data.notificacion;
            alert("Notificación creada:\n" + JSON.stringify(notificacion, null, 2)); // Mostrar el objeto como JSON legible
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al crear la notificación: ' + error.message);
        });
    }
}
