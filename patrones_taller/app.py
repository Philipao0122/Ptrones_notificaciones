from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

notificaciones = []
buzones = {
    "usuario1.html": [],
    "usuario2.html": [],
    "usuario3.html": []
}

# Configurar la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notificaciones.db'
db = SQLAlchemy(app)

# Definir el modelo de Notificación
class Notificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Asunto = db.Column(db.String(100), nullable=False)
    mensaje = db.Column(db.String(200), nullable=False)

# Crear la base de datos
with app.app_context():
    db.create_all()

@app.route("/")
def index():
    return "Bienvenido a mi aplicación"

@app.route("/favicon.ico")
def favicon():
    return send_from_directory("static", "favicon.ico")

def formatear_fecha(fecha):
    """Formatea la fecha a un formato legible: 'día, mes año, hora:minutos'."""
    return fecha.strftime("%d, %B %Y, %H:%M")

# Ruta para crear una notificación
@app.route('/crear_notificacion', methods=['POST'])
def crear_notificacion():
    if request.is_json:
        data = request.get_json()

        Asunto = data.get('Asunto', 'Desconocido')
        mensaje = data.get('mensaje', '')
        destinatario = data.get('destinatario', '')

        if not Asunto or not mensaje or not destinatario:
            return jsonify({"error": "Faltan datos de notificación"}), 400

        fecha = datetime.now()

        # Crear nueva notificación
        nueva_notificacion = {
            "fecha": formatear_fecha(fecha),
            "Asunto": Asunto,
            "mensaje": mensaje,
        }

        # Inyectar la notificación en el buzón correspondiente
        if destinatario in buzones:
            buzones[destinatario].append(nueva_notificacion)  # Agregar a la lista del buzón

        return jsonify({
            "status": "success",
            "notificacion": nueva_notificacion
        }), 200

    # Si no se recibió JSON en la solicitud
    return jsonify({"error": "Solicitud inválida, se esperaba JSON"}), 400

# Ruta para obtener todas las notificaciones
@app.route('/notificaciones/<destinatario>', methods=['GET'])
def obtener_notificaciones(destinatario):
    if destinatario in buzones:
        return jsonify(buzones[destinatario]), 200
    else:
        return jsonify({"error": "Destinatario no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
