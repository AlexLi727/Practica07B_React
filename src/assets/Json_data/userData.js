[
    {
        "titulo": "Cuestionario de Datos del Usuario",
        "preguntas": [
            {
                "id": "nombre",
                "tipo": "text",
                "pregunta": "¿Cuál es tu nombre?",
                "respuesta": "",
                "restricciones": {
                    "min": 3,
                    "max": 50
                }
            },
            {
                "id": "fecha_nacimiento",
                "tipo": "text",
                "pregunta": "¿Cuál es tu fecha de nacimiento?",
                "respuesta": "",
                "restricciones": {
                    "min": 1,
                    "max": 10
                },
                "validacion": {
                    "min_edad": 17
                }
            },
            {
                "id": "email",
                "tipo": "text",
                "pregunta": "¿Cuál es tu correo electrónico?",
                "respuesta": "",
                "restricciones": {
                    "min": 5,
                    "max": 100
                },
                "validacion": {
                    "formato": "email",
                    "dominio": "stucom.com"
                }
            },
            {
                "id": "sexo",
                "tipo": "select",
                "pregunta": "¿Cuál es tu sexo?",
                "respuesta": "",
                "opciones": ["Masculino", "Femenino", "Otro"]
            },
            {
                "id": "preferencias",
                "tipo": "check",
                "pregunta": "¿Qué prefieres hacer en tu tiempo libre?",
                "respuesta": "",
                "opciones": ["Leer", "Deportes", "Viajar", "Cine"]
            }
        ]
    }
]