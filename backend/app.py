from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite peticiones desde React

# Configura la conexión a tu base de datos
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'gameofdreams'

mysql = MySQL(app)

# Ruta para obtener testimonios
@app.route('/api/testimonios', methods=['GET'])
def obtener_testimonios():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM testimonios")
    datos = cur.fetchall()

    testimonios = []
    for fila in datos:
        testimonios.append({
            'id_test': fila[0],
            'nombre_usuario': fila[1],
            'titulo_test': fila[2],
            'cargo_test': fila[3],
            'contenido_test': fila[4],
            'fecha_creacion_test': fila[5].strftime('%Y-%m-%d'),
            'estado': fila[6],
            'imagen_url': fila[7] if len(fila) > 7 else None
        })

    return jsonify(testimonios)

@app.route('/api/testimonios/<int:id>/aprobar', methods=['PUT'])
def aprobar_testimonio(id):
    cur = mysql.connection.cursor()
    cur.execute("UPDATE testimonios SET estado = 'aprobado' WHERE id_test = %s", (id,))
    mysql.connection.commit()
    return jsonify({'success': True})

@app.route('/api/testimonios/<int:id>/anular', methods=['PUT'])
def anular_testimonio(id):
    cur = mysql.connection.cursor()
    cur.execute("UPDATE testimonios SET estado = 'anulado' WHERE id_test = %s", (id,))
    mysql.connection.commit()
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
