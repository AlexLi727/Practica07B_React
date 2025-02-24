# Componente de Formularios

Este componente es responsable de manejar y renderizar los formularios en nuestra aplicación.

## Uso

Para utilizar este componente, sigue los siguientes pasos:

1. Importa el componente en tu archivo de JavaScript:

```javascript
import Formulario from './Formulario';
```

2. Utiliza el componente en tu renderizado:

```jsx
<Formulario />
```

## Propiedades

El componente de Formularios acepta las siguientes propiedades:

- `onSubmit`: Una función que se ejecuta cuando se envía el formulario.

- `inputs`: Un array de objetos que define los campos del formulario. Cada objeto debe tener las siguientes propiedades:

    - `name`: El nombre del campo.

    - `label`: La etiqueta del campo.

    - `type`: El tipo de campo (por ejemplo, "text", "email", "password").

    - `required`: Un booleano que indica si el campo es obligatorio.

    - `placeholder`: El texto de marcador de posición para el campo.

## Ejemplo

```jsx
import React from 'react';
import Formulario from './Formulario';

const App = () => {
    const handleSubmit = (data) => {
        // Lógica para manejar los datos del formulario
        console.log(data);
    };

    const inputs = [
        {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            required: true,
            placeholder: 'Ingresa tu nombre',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'Ingresa tu email',
        },
        {
            name: 'password',
            label: 'Contraseña',
            type: 'password',
            required: true,
            placeholder: 'Ingresa tu contraseña',
        },
    ];

    return (
        <div>
            <h1>Formulario de Registro</h1>
            <Formulario onSubmit={handleSubmit} inputs={inputs} />
        </div>
    );
};

export default App;
```
