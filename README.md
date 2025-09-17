- [Storytelling Interactivo](#storytelling-interactivo)
  - [Demo](#demo)
  - [Pre requisitos](#pre-requisitos)
  - [Comenzando](#comenzando)
    - [Generar posición del mapa](#generar-posición-del-mapa)
    - [Archivo de configuración y configuración de capa](#archivo-de-configuración-y-configuración-de-capa)
    - [Opciones de configuración](#opciones-de-configuración)
    - [Configuración de estilo de Mapbox Studio](#mapbox-studio-style-configuration)
    - [Organización](#organización)
  - [Despliegue](#despliegue)
  - [Hecho con](#hecho-con)
  - [Autores](#autores)
  - [Licencia](#licencia)
  - [Agradecimientos](#agradecimientos)

![3D mountains in Colorado](assets/co14ersstory.gif)

# Storytelling Interactivo
Esta plantilla está diseñada para facilitar la creación de una narrativa cartográfica. La entrada principal es una historia dividida en secciones (`capítulos`), cada una vinculada a una vista específica del mapa.

Opcionalmente, puedes introducir un estilo de Mapbox personalizado con capas diseñadas en Mapbox Studio y alternar la opacidad de la capa.

El código está compuesto por un archivo HTML, un archivo de estilo CSS y un archivo de JavaScript. Estos se pueden alojar en cualquier ubicación web accesible, sin necesidad de código ni infraestructura adicional. Incrustar el resultado como un iFrame en otra página no funcionará correctamente. La interfaz con desplazamiento requiere la página completa.

## Demo

Puedes ver un ejemplo de esta plantilla en [https://labs.mapbox.com/storytelling/](https://labs.mapbox.com/storytelling/)

## Pre requisitos
Esta plantilla está diseñada para contar historias digitales con mapas y datos. Para agregar capas del mapa personalizadas, necesitarás alguna familiaridad con [Mapbox Studio](https://studio.mapbox.com).

Para configurar y publicar la historia necesitarás:
- Un [token de acceso](https://docs.mapbox.com/help/glossary/access-token) de Mapbox. Puedes crear una cuenta gratuita en: [mapbox.com](https://www.mapbox.com/signup/).

- Un editor de código como Visual Studio Code. También puedes editar el código usando CodeSpaces de GitHub.

- Un lugar donde publicar tu web. Cualquier servicio que aloje páginas estáticas sirve. [Github Pages](https://pages.github.com/) es una buena opción gratuita.

- Una historia.

- Atención al detalle. El archivo de configuración requiere sintaxis y puntuación específicas. Las llaves, corchetes, comas y comillas son importantes. Consulta la plantilla `config.js.template` para obtener orientación. Se recomienda tener cierta familiaridad con [JSON]('https://www.copterlabs.com/json-what-it-is-how-it-works-how-to-use-it/').

- Opcionalmente, algunos datos espaciales en tu mapa de Mapbox. La plantilla permite incluir nombres de capas para mostrar y ocultar los datos a medida que se hace la transición entre las secciones de la historia. Puedes resaltar un barrio o mostrar datos satelitales de dos momentos diferentes.

La plantilla no depende de ningún framework CSS, fuentes ni imágenes en particular. Hay algunos estilos básicos en el archivo de CSS que se pueden modificar, así que siéntete libre de adaptarlos y añadirlos para que se ajusten a la marca de tu sitio y tu historia.

![captura de pantalla de la historia de ejemplo](assets/glacierdemo.gif)

## Ejecutar el archivo index.html en un servidor de desarrollo

Clona este repositorio y ábrelo en Visual Studio Code o con CodeSpaces.

### 1: Instala la extensión Live Server
Para facilitar la previsualización de los cambios en tiempo real, puede instalar la extensión Live Server en Visual Studio Code. (Esto servirá el archivo `index.html` desde un servidor web local, evitando errores CORS y otros problemas que pueden surgir al abrir un archivo HTML sin usar un servidor de desarrollo):
1. Vaya a la pestaña **Extensiones** en Visual Studio Code (el icono cuadrado en la barra lateral).
2. Busque **Live Server** y haga clic en **Instalar**.
3. Una vez instalado, podrá iniciar un servidor en vivo para previsualizar el archivo HTML.

### 2: Ejecuta el archivo HTML en tu navegador
1. Con el archivo `index.html` abierto, dale click derecho en la ventana del editor y selecciona **Open with Live Server**. O haz click en el botón "Go Live" en la parte inferior derecha del editor. 
2. Se abrirá tu navegador por defecto, mostrando el mapa de storytelling usando la configuración por defecto que se encuentra en `config.js`. Si no haz agregado tu token de acceso de Mapbox, el mapa no se mostrará. Sigue los siguientes pasos para actualizad la configuración de `config.js`.

#### Personalizar tu configuración

Abre `config.js` y edita lo siguiente para personalizar el mapa de tu historia.

1. **Agrega un token de acceso de Mapbox.** Reemplaza `YOUR_MAPBOX_ACCESS_TOKEN` con un token de acceso de tu cuenta [account.mapbox.com](htps://account.mapbox.com). Una buena práctica es [crear un token diferente](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/#creating-and-managing-access-tokens) para cada mapa para poder hacer seguimiento del tráfico de tus distintos mapas. 

2. **Selecciona el estilo del mapa** que quieres usar (por defecto es el Mapbox Standard, pero puedes encontrar más estilos [en la página de documentación de nuestra API de Estilos](https://docs.mapbox.com/api/maps/styles/#classic-mapbox-styles), o crear tu propio estilo en [Mapbox Studio](https://studio.mapbox.com)).

3. **Elige si mostrar o no un marcador** en el centro de cada locación en el mapa. Si estás mostrando marcadores, puedes configurar el color usando la propiedad `markerColor`. El color por defecto es azul.

4. **Elige un tema para el texto de la historia**. Puede ser `light` o `dark`.

```
{
    style: 'mapbox://styles/mapbox/streets-v11',
    tokenDeAcceso: 'YOUR_MAPBOX_ACCESS_TOKEN',
    mostrarMarcadores: true,
    markerColor: '#3FB1CE',
    tema: 'light',
    usarTerreno3d: false,
    titulo: 'The Title Text of this Story',
    subtitulo: 'A descriptive and interesting subtitle to draw in the reader',
    autor: 'By a Digital Storyteller',
    footer: 'Source: source citations, etc.',
    capitulos: [
    ...
    ]
{
```

6. **Agrega tantos `capitulos` en tu plantilla como necesites.** Vas a necesitar una `,` entre cada sección, pero no una coma al final. Así se ve un `capítulo`:

```
{
    id: 'slug-style-id',
    alineacion: 'left',
    oculto: false,
    titulo: 'Display Title',
    imagen: './path/to/image/source.png',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ubicacion: {
        center: [-122.418398, 37.759483],
        zoom: 8.5,
        inclinacion: 60,
        bearing: 0
    },
    animacionMapa: 'flyTo',
    rotarAnimacion: false,
    callback: '',
    onChapterEnter: [],
    onChapterExit: []
},
```

7. **Llena las secciones según lo que necesites.**  Da un nombre único a cada sección con la propiedad `id`. Este se convertirá en el `div` `id` HTML, así que evita espacios en el nombre. Las propiedades `titulo` y `descripcion` son opcionales. `descripcion` admite etiquetas HTML. Si tienes una imagen que corresponde a esa sección de la historia, agrega la ruta a la imagen en `imagen`.

8. Determina la `ubicación` del mapa. Opcionalmente, puedes cambiar el estilo de este archivo a tu [estilo personalizado](https://docs.mapbox.com/mapbox-gl-js/example/custom-style-id/).

9. Repite hasta que hayas puesto las coordenadas de cada una de tus secciones.

10. Abre `index.html` en un navegador y haz scroll. Voila!

11. Hay más opciones disponibles en `config.js`. Consulta la documentación de este archivo README y experimenta con los diferentes valores a medida que creas tu historia. Si conoces HTML, CSS y JavaScript, puedes personalizar cada aspecto del mapa narrativo, mucho más allá de las opciones que ofrecemos en esta plantilla. ¡Diviértete y comparte tu trabajo!

#### Generar posición del mapa 

Usa la herramienta [Mapbox Location Helper](https://labs.mapbox.com/location-helper/), [Google Maps](https://www.google.com/maps) (haciendo click derecho sobre el lugar que quieras elegir), u otra herramienta para buscar los lugares en el mapa y ubicar las coordenadas de su centro.

![location helper screen capture](assets/location-helper.gif)

#### Archivo de configuración y configuración de capa

Aquí hay un ejemplo de un archivo de configuración simple:

```
var config = {
    style: 'mapbox://styles/branigan/cjz37rcb003ib1cr3s8rnkt2d',
    tokenDeAcceso: 'pk.eyJ1IjoibWJ4c29sdXRpb25zIiwiYSI6ImNrMm01aG9hdTBlZGwzbXQ1ZXVrNHNmejAifQ.QHQA0N6XPWddCXtvoODHZg',
    mostrarMarcadores: false,
    tema: 'dark',
    usarTerreno3d: true,
    titulo: 'Glaciares del Parque Nacional Glaciar',
    subtitulo: 'Change in coverage from 1998 to 2015',
    autor: '',
    footer: 'Fuente: Texto de la historia de Wikipedia, Agosto 2019. Datos de: <a href="https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park">USGS</a>',
    capitulos: [
        {
            id: 'glacier-np',
            alineacion: 'full',
            titulo: 'Glaciares del Parque Nacional Glaciar',
            imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/2015-06-19_Glacier_National_Park_%28U.S.%29_8633.jpg/800px-2015-06-19_Glacier_National_Park_%28U.S.%29_8633.jpg',
            descripcion: 'El Parque Nacional Glaciar está dominado por montañas que fueron talladas en sus formas actuales por los enormes glaciares de la última edad de hielo...',
            ubicacion: {
                center: [-113.91666, 48.66451],
                zoom: 8,
                inclinacion: 0.00,
                bearing: 0.00
            },
            onChapterEnter: [
                {
                    layer: 'gnpglaciers-1998',
                    opacity: 0.25
                },
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0.25
                }
            ],
            onChapterExit: [
                {
                    layer: 'glaciernp-boundary',
                    opacity: 0
                }
            ]
        },
        {
            id: 'harrison1998',
            alineacion: 'left',
            titulo: 'Glaciar Harrison, 1998',
            imagen: '',
            descripcion: 'El glaciar Harrison se encuentra en el estado estadounidense de Montana, en el Parque Nacional de los Glaciares. Situado en una cresta orientada al sureste, justo al sur del Monte Jackson, es el glaciar más grande del Parque Nacional de los Glaciares.',
            ubicacion: {
                center: [-113.72917, 48.58938],
                zoom: 12.92,
                inclinacion: 39.50,
                bearing: 36.00
            },
            onChapterEnter: [],
            onChapterExit: [
                // {
                //     layer: 'gnpglaciers-2015',
                //     opacity: 0
                // }
            ]
        }
    ]
}
```
#### Opciones de configuración

| Opción                   | Tipo   | Descripción                                                                                                                                                                                                        |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `style` (Requerido)       | String | Esta es la `url` del estilo de Mapbox que se usará en la aplicación. Puede ser un estilo estándar o uno personalizado de tu cuenta de Mapbox. Usa un estilo personalizado si quieres incluir datos o capas personalizados.                        |
| `tokenDeAcceso` (Requerido) | String | Tu token de acceso de Mapbox.                                                                                                                                                           |
| `mostrarMarcadores`            | String | Controla si se muestran marcadores en el punto central de cada capítulo. Si es "true", el mapa mostrará un icono azul predeterminado en forma de lágrima invertida.                    |
| `markerColor`            | String | Acepta hexadecimal, RGB, y nombres de colores [compatible con CSS estándar](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Sobreescribe el azul claro por defecto si el marcador de color  `showMarkers` es `true`. |
| `tema`                  | String | Hay dos temas básicos disponibles (claro y oscuro).                                                                                                                                                                   |
| `usarTerreno3d`           | String | Habilita el terreno 3D.(Opcional)                                                                                                                                                                                     |
| `inset`                  | String | Habilita un minimapa del globo.(Opcional)                                                                                                                                                                                |
| `insetOptions`           | Objeto | [opciones del `GlobeMiniMap`](https://github.com/chriswhong/mapbox-gl-globe-minimap?tab=readme-ov-file#options)                                                                                                        |
| `insetPosition`          | String |Una cadena que representa la posición del mapa insertado en el mapa. Las opciones válidas son: `top-left`, `top-right`, `bottom-left`, `bottom-right`.                                                                                                      |
| `projection`             | String | Configura el [parámetro proyección](https://docs.mapbox.com/mapbox-gl-js/example/projections/) del objeto Mapa para crear un mapa con una proyección que no sea Mercator.(Opcional)                                                 |
| `auto`                   | String | Permite el avance automático a través de los capítulos. (Opcional)                                                                                                                                                     |
| `titulo`                  | String | El título general de la historia.(Opcional)                                                                                                                                                                         |
| `subtitulo`               | String | Un subtítulo para la historia. (Opcional)                                                                                                                                                                               |
| `autor`                 | String | Créditos del(a) autor(a) de la historia. (Opcional)                                                                                                                                                                         |
| `footer`                 | String | Citas, créditos, etc., se muestran al final de la historia en la parte inferior.                                                                                                                                               |
| `capitulos` (Requerido)    | String | Contiene todos los contenidos de la historia y los controles del mapa para cada sección. _Array de objectos_                                                                                                               |

---

#### Opciones de los capítulos

| Opción                 | Tipo   | Descripción                                                                                                                                                                               |
| ---------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` (Requerido)        | String | Un ID de estilo slug para el capítulo. Lo usa el JavaScript de la aplicación y se asigna como un `id` HTML para el `div` que contiene la historia. Práctica recomendada: usar kebab-case, por ejemplo, `mi-historia-capítulo-1`. |
| `alineacion` (Requerido) | String | Define dónde debe aparecer el texto de la historia en el mapa. Opciones: `center`, `left`, `right`, `full`. El valor predeterminado es `center` para ventanas de navegador de menos de 750 píxeles de ancho.               |
| `oculto`               | String | Establece la visibilidad del capítulo como oculta (`hidden`) cuando es verdadera (`true`). El capítulo seguirá activando una transición de mapa y capa.                   |
| `titulo`                | String | Título de la sección, mostrado en un elemento de tipo`h3`.                                                                                                                                       |
| `imagen`                | String | URL de la imagen a mostrarse en esta sección.                                                                                                                                              |
| `descripcion`          | String | Contenido principal de la sección. Coincide con lo que el lector ve en el mapa. Compatible con HTML para imágenes, enlaces, etc.                                                                   |
| `ubicacion` (Requerido)  | String | Detalles sobre la visualización del mapa y la vista de la cámara (por ejemplo, centro, zoom, inclinación, rumbo).                                                                                                   |
| `animacionMapa`         | String | Define el [tipo de animación](https://docs.mapbox.com/mapbox-gl-js/api/#map#jumpto) para las transiciones. Opciones: `flyTo`, `easeTo`, `jumpTo`. Por defecto es `flyTo`.                            |
| `rotarAnimacion`      | String | Inicia una animación de rotación lenta al final de la transición del mapa cuando es `true`. Gira 90 grados durante 24 segundos.                                                                  |
| `callback`             | String |Nombre de una función de JavaScript para ejecutar código personalizado para el capítulo, por ejemplo, activar o desactivar una leyenda, agregar datos de API o mostrar un gráfico interactivo.                                 |
| `onChapterEnter`       | String | Capas que se mostrarán/ocultarán/silenciarán cuando la sección se active. _Array de objectos_ (ej., nombre de la capa, opacidad, duración).                                                            |
| `onChapterExit`        | String | Igual que `onChapterEnter`, Se activa cuando la sección se vuelve inactiva. _Array de objectos_.                                                                                                |

---

#### Detalles de localización

| Opción              | Tipo   | Descripción                                                                                           |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `center` (Requerido) | String | Coordenadas centrales del mapa como `longitude, latitude`.                                              |
| `zoom` (Requerido)   | String | Nivel de zoom del mapa.                                                                                |
| `inclinacion`             | String | Ángulo de la vista del mapa. `0` es recto hacia abajo y `60` es muy inclinado.                               |
| `bearing`           | String | Grados de rotación en sentido horario desde el norte (`0`). Los valores negativos representan rotación en sentido antihorario. |
| `speed`             | String | Velocidad de la animación de vuelo (flyTo).                                                   |
| `curve`             | String | Factor de curva para la animación de vuelo (flyTo).                                                     |

#### Configuración de capa en tu estilo de Mapbox Studio

Añade y estiliza cada capa personalizada en tu estilo del Mapbox Studio. Antes de la publicación final, configura el estilo de las capas para que se oculten con una opacidad de 0. **No ocultes la capa**. Por ejemplo, si tienes una capa de `círculo`, asegúrate de que la opacidad del color (`color-opacity`) o la opacidad del trazo (`stroke-opacity`) estén configuradas en 0.

Esto garantizará que el mapa se muestre correctamente al cargar la página de la historia. Para ajustar la opacidad de las capas a medida que el lector se desplaza por la historia, utiliza las opciones de configuración `onChapterEnter` u `onChapterExit` para configurar la opacidad deseada para la capa.

## Despliegue

Aloja los archivos `index.html`, `estilo.css`, `script.js`, y `config.js` en el mismo directorio, en una ubicación accesible desde la web. Si no sabes por dónde empezar, consulta GitHub Pages o Netlify.

## Hecho con

- Mapbox GL JS
- Scrollama.js

## Autores

John Branigan del [Equipo de Soluciones de Arquitectura](mailto:solutions_architecture@mapbox.com) de Mapbox.

Traducción al español y algunos cambios: Antonia Bu (@anattolia)

## Licencia

Licencia BSD 3-Clause

## Agradecimientos

* Lo Bénichou por la idea, el apoyo y la increíble retroalimentación durante el proceso de diseño y desarrollo.
* Paige Moody y Lem Thornton por las pruebas tempranas y la retroalimentación
* Chris Toomey por impulsar este trabajo y mantener las cosas en marcha.
* Lxs periodistas con historias que nos ayudan a dar sentido a lo que nos rodea.
* [Digital Democracy](https://www.digital-democracy.org/) y [Rudo Kemper](https://kunukumapping.com/) por [su fork](https://github.com/digidem/mapbox-storytelling-upgraded) que inspiró muchas de las características posteriores.
* [Paul Franz](https://github.com/pkfranz) por desarrollar personalizaciones y dar retroalimentación.

## Ejemplos notables

- [Connectivity Disparity Across Schools in Kazakhstan: UNICEF](https://unicef.github.io/mapbox_analysis/story/map)
- [Saving the Nile: Aljazeera](https://interactive.aljazeera.com/aje/2020/saving-the-nile/index.html)
- [49 Mile Map: San Francisco Chronicle](https://projects.sfchronicle.com/total-sf/49-mile-map/)
- [Dark Vessel Detection: ICEYE](https://www.iceye.com/use-cases/security/dark-vessel-detection/interactive-demo)
- [Nuestro Territorio Es Nuestra Vida: Digital Democracy](http://lab.digital-democracy.org/mapa-sinangoe/)
- [The Chinese Economic Footprint In Central And Eastern Europe: CSD](https://chinacapture.csd.bg/)
- [Safe passages: Washington Post](https://www.washingtonpost.com/graphics/2020/climate-solutions/wyoming-wildlife-corridor/)
- [Polar Star Inn and Seipel Hut: Huttrip](https://map.huttrip.com/ )
- [Ten Conflicts to watch in 2022: Crisis Group](https://conflicts2022.crisisgroup.org/ )
- [The Guiana Shield: The Amazon Conservation Team](https://www.amazonteam.org/maps/guiana-shield/)
- [Watchlist 2021: International Rescue Committee](https://theirc.github.io/watchlist2021/)
- [A River Drained: Kontinentalist](https://cdn-images.kontinentalist.com/static-html/food-security-mekong-river-hydropower-dam-climate-change/index.html)
- [Climate Gentrification and its impact on New York City: Judy Huynh](https://www.climategentrification.info/)

[mapbox.com/resources#solutions](https://www.mapbox.com/resources#solutions)
