[
    {
        "titulo": "Encuesta de Preferencias de Cine",
        "preguntas": [
            {
                "id": "comentarios",
                "tipo": "textarea",
                "pregunta": "¿Qué género de películas prefieres?",
                "respuesta": "Acción, ciencia ficción y comedia.",
                "restricciones": {
                    "min": 10,
                    "max": 150
                }
            },
            {
                "id": "favorito",
                "tipo": "select",
                "pregunta": "¿Cuál es tu película favorita?",
                "respuesta": "Inception",
                "opciones": ["Inception", "The Matrix", "Avengers", "Titanic"]
            },
            {
                "id": "vista",
                "tipo": "check",
                "pregunta": "¿Has visto alguna de las siguientes películas?",
                "respuesta": "sí",
                "opciones": ["Inception", "The Matrix", "Avengers", "Titanic"]
            },
            {
                "id": "frecuencia",
                "tipo": "select",
                "pregunta": "¿Con qué frecuencia ves películas?",
                "respuesta": "4",
                "opciones": [
                    {
                        "grupo": "Opción 1-5 veces al mes",
                        "valores": ["1", "2", "3", "4", "5"]
                    }
                ]
            }
        ]
    }
]