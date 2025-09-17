var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // deja comentado para usar el estilo estándar de Mapbox
    tokenDeAcceso: 'pk.eyJ1IjoiYW5hdHRvbGFpIiwiYSI6InR5R3U4MmsifQ.rM6ZPt6QHPuMGAAOHFM4RQ', // Reemplaza con tu propio token de acceso
    mostrarMarcadores: true,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Lee más acerca de las proyecciones disponibles en:
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    tema: 'dark',
    usarTerreno3d: false, //true para mapas en 3d
    auto: false,
    titulo: 'Título del mapa',
    subtitulo: 'Plantilla para Storytelling con mapa animado.',
    autor: 'Por: Autor(a) de la historia',
    footer: 'Fuente: citación de fuentes, etc. <br> Creado usando la plantilla de <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a>.',
    capitulos: [
        {
            id: 'slug-style-id',
            alineacion: 'left',
            oculto: false,
            titulo: 'Bogotá',
            imagen: './assets/bogota.jpeg', // Enlace a primera imagen
            descripcion: 'Primer capítulo: Título, descripción e imagen del primer lugar.',
            ubicacion: {
                center: [-74.06930, 4.60476], // Coordenadas del primer lugar
                zoom: 8.5, // Nivel de zoom
                inclinacion: 60, // Inclinación de la cámara
                bearing: 0 // Rotación de la cámara
            },
            animacionMapa: 'flyTo',
            rotarAnimacion: false,
            callback: '',
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1,
                //     duration: 5000
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'segundo-identificador',
            alineacion: 'right',
            oculto: false,
            titulo: 'Washington, D.C.', // Título del segundo lugar
            imagen: './assets/washington-dc.jpg',
            descripcion: 'El segundo capítulo vuela a Washington, D.C., actualiza la cámara y rota lentamente.',
            ubicacion: {
                center: [-77.020636, 38.886900], // Coordenadas del segundo lugar
                zoom: 8.5,
                inclinacion: 60,
                bearing: -43.2,
                // Controles adicionales del flyTo:
                // Estas opciones controlan la curva de vuelo, haciendo que se mueva
                // lentamente y se aleje casi totalmente antes
                // de hacer un paneo.
                //speed: 2, // hace el vuelo lento
                //curve: 1, // cambia la velocidad a la que se aleja
            },
            animacionMapa: 'flyTo',
            rotarAnimacion: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'tercer-identificador',
            alineacion: 'left',
            oculto: false,
            titulo: 'Ginebra',
            imagen: './assets/geneva.jpg',
            descripcion: 'Ginebra, Suiza, es una pintoresca ciudad situada a orillas del lago Lemán, rodeada por los Alpes y el Jura. Conocida como un centro global de diplomacia y finanzas, es sede de numerosas organizaciones internacionales, como las Naciones Unidas y la Cruz Roja.',
            ubicacion: {
                center: [6.15116, 46.20595],
                zoom: 12.52,
                inclinacion: 8.01,
                bearing: 0.00
            },
            animacionMapa: 'flyTo',
            rotarAnimacion: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'cuarto-capitulo',
            alineacion: 'fully',
            oculto: false,
            titulo: 'Buenos Aires',
            imagen: './assets/buenos-aires.jpg',
            descripcion: 'En Buenos Aires, la capital argentina...',
            ubicacion: {
                center: [-58.54195, -34.71600],
                zoom: 4,
                inclinacion: 0,
                bearing: 0
            },
            animacionMapa: 'flyTo',
            rotarAnimacion: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
