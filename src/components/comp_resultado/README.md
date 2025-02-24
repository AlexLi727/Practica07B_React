# Componente de Resultados

Este componente se encarga de mostrar los resultados de cada formulario en la aplicación.

## Uso

Para utilizar este componente, sigue los siguientes pasos:

1. Importa el componente en tu archivo de JavaScript:

```javascript
import Resultados from './components/comp_resultado/Resultado';
```

2. Utiliza el componente en tu renderizado:

```javascript
<Resultados resultados={data} />
```

Donde `data` es un array de objetos que contiene los resultados de los formularios.

## Propiedades

El componente acepta las siguientes propiedades:

- `resultados` (array, requerido): Un array de objetos que contiene los resultados de los formularios.

## Ejemplo

```javascript
import React from 'react';
import Resultados from './components/comp_resultado/Resultado';

const App = () => {
    const resultados = [
        { id: 1, nombre: 'Formulario 1', resultado: 'Aprobado' },
        { id: 2, nombre: 'Formulario 2', resultado: 'Rechazado' },
        { id: 3, nombre: 'Formulario 3', resultado: 'Pendiente' },
    ];

    return (
        <div>
            <h1>Resultados de Formularios</h1>
            <Resultados resultados={resultados} />
        </div>
    );
};

export default App;
```

## Contribución

Si deseas contribuir a este componente, por favor sigue las siguientes pautas:

1. Realiza un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad: `git checkout -b nueva-funcionalidad`.
3. Realiza tus cambios y realiza commits: `git commit -m "Agrega nueva funcionalidad"`.
4. Realiza un push a tu rama: `git push origin nueva-funcionalidad`.
5. Abre un pull request en el repositorio original.

¡Gracias por tu contribución!
