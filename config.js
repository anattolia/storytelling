var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // deja comentado para usar el estilo estándar de Mapbox
    accessToken: 'pk.eyJ1IjoiYW5hdHRvbGFpIiwiYSI6InR5R3U4MmsifQ.rM6ZPt6QHPuMGAAOHFM4RQ',
    showMarkers: true,
    markerColor: '#3FB1CE',
    //projection: 'equirectangular',
    //Lee más acerca de las proyecciones disponibles en:
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'dark',
    use3dTerrain: false, //true para mapas en 3d
    auto: false,
    title: 'Título del mapa',
    subtitle: 'Plantilla para Storytelling con mapa animado.',
    byline: 'Por: Autor(a) de la historia',
    footer: 'Fuente: citación de fuentes, etc. <br> Creado usando la plantilla de <a href="https://github.com/mapbox/storytelling" target="_blank">Mapbox Storytelling</a>.',
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            title: 'Bogotá',
            image: './assets/bogota.jpeg', // Enlace a primera imagen
            description: 'Primer capítulo: Título, descripción e imagen del primer lugar.',
            location: {
                center: [-74.06930, 4.60476], // Coordenadas del primer lugar
                zoom: 8.5, // Nivel de zoom
                pitch: 60, // Inclinación de la cámara
                bearing: 0 // Rotación de la cámara
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
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
            id: 'second-identifier',
            alignment: 'right',
            hidden: false,
            title: 'Washington, D.C.', // Título del segundo lugar
            image: './assets/washington-dc.jpg',
            description: 'The second chapter flies to Washington, D.C., updates the camera pitch, and slowly rotates. <br>  <br> Washington, D.C., the capital of the United States, is a vibrant city known for its iconic landmarks, including the White House, the U.S. Capitol, and the Washington Monument. It serves as the political heart of the nation and a center for history, culture, and international diplomacy.',
            location: {
                center: [-77.020636, 38.886900], // Coordenadas del segundo lugar
                zoom: 8.5,
                pitch: 60,
                bearing: -43.2,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Geneva',
            image: './assets/geneva.jpg',
            description: 'Geneva, Switzerland, is a picturesque city nestled along the shores of Lake Geneva, surrounded by the Alps and Jura mountains. Known as a global hub for diplomacy and finance, it is home to numerous international organizations, including the United Nations and the Red Cross.',
            location: {
                center: [6.15116, 46.20595],
                zoom: 12.52,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'fourth-chapter',
            alignment: 'fully',
            hidden: false,
            title: 'Buenos Aires',
            image: './assets/buenos-aires.jpg',
            description: 'En Buenos Aires, la capital argentina...',
            location: {
                center: [-58.54195, -34.71600],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
