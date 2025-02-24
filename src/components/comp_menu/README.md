# Componente de Menú Principal

Este componente es responsable de manejar el menú principal de la aplicación. Proporciona una interfaz de usuario intuitiva y fácil de usar para navegar por las diferentes secciones de la aplicación.

## Características

- Muestra una lista de opciones de menú.
- Permite al usuario seleccionar una opción de menú.
- Actualiza dinámicamente la interfaz de usuario según la opción seleccionada.

## Uso

Para utilizar este componente, sigue los siguientes pasos:

1. Importa el componente en tu archivo de JavaScript:

```javascript
import MainMenu from './MainMenu';
```

2. Agrega el componente en tu renderizado:

```jsx
<MainMenu />
```

3. Personaliza las opciones de menú según tus necesidades:

```jsx
<MainMenu
    options={[
        { label: 'Inicio', link: '/' },
        { label: 'Acerca de', link: '/about' },
        { label: 'Contacto', link: '/contact' },
    ]}
/>
```

## Contribución

Si deseas contribuir a este componente, por favor sigue las pautas de contribución en [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licencia

Este componente está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](./LICENSE).
