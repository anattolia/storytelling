        let initLoad = true;
        let tiposDeCapa = {
            'fill': ['fill-opacity'],
            'line': ['line-opacity'],
            'circle': ['circle-opacity', 'circle-stroke-opacity'],
            'symbol': ['icon-opacity', 'text-opacity'],
            'raster': ['raster-opacity'],
            'fill-extrusion': ['fill-extrusion-opacity'],
            'heatmap': ['heatmap-opacity']
        }

        let alineaciones = {
            'left': 'lefty',
            'center': 'centered',
            'right': 'righty',
            'full': 'fully'
        }

        function obtenerTipoDePinturaDeCapa(capa) {
            let tipoDeCapa = map.getLayer(capa).type;
            return tiposDeCapa[tipoDeCapa];
        }

        function setLayerOpacity(capa) {
            let propiedadesDePintura = obtenerTipoDePinturaDeCapa(capa.layer);
            propiedadesDePintura.forEach(function (prop) {
                let opciones = {};
                if (capa.duration) {
                    let propiedadTransicion = prop + "-transition";
                    opciones = { "duration": capa.duration };
                    map.setPaintProperty(capa.layer, propiedadTransicion, opciones);
                }
                map.setPaintProperty(capa.layer, prop, capa.opacity, opciones);
            });
        }

        let historia = document.getElementById('historia');
        let caracteristicas = document.createElement('div');
        caracteristicas.setAttribute('id', 'features');

        let header = document.createElement('div');

        if (config.titulo) {
            let textoTitulo = document.createElement('h1');
            textoTitulo.innerText = config.titulo;
            header.appendChild(textoTitulo);
        }

        if (config.subtitulo) {
            let textoSubtitulo = document.createElement('h2');
            textoSubtitulo.innerText = config.subtitulo;
            header.appendChild(textoSubtitulo);
        }

        if (config.autor) {
            let textoAutor = document.createElement('p');
            textoAutor.innerText = config.autor;
            header.appendChild(textoAutor);
        }

        if (header.innerText.length > 0) {
            header.classList.add(config.tema);
            header.setAttribute('id', 'header');
            historia.appendChild(header);
        }

        // Configurar cada capítulo
        config.capitulos.forEach((record, idx) => {
            let contenedor = document.createElement('div');
            let capitulo = document.createElement('div');

            if (record.titulo) {
                let titulo = document.createElement('h3');
                titulo.innerText = record.titulo;
                capitulo.appendChild(titulo);
            }

            if (record.imagen) {
                let imagen = new Image();
                imagen.src = record.imagen;
                capitulo.appendChild(imagen);
            }

            if (record.descripcion) {
                let historia = document.createElement('p');
                historia.innerHTML = record.descripcion;
                capitulo.appendChild(historia);
            }

            contenedor.setAttribute('id', record.id);
            contenedor.classList.add('step');
            if (idx === 0) {
                contenedor.classList.add('active');
            }

            capitulo.classList.add(config.tema);
            contenedor.appendChild(capitulo);
            contenedor.classList.add(alineaciones[record.alineacion] || 'centered');
            if (record.oculto) {
                contenedor.classList.add('hidden');
            }
            caracteristicas.appendChild(contenedor);
        });

        historia.appendChild(caracteristicas);

        let footer = document.createElement('div');

        if (config.footer) {
            let textoFooter = document.createElement('p');
            textoFooter.innerHTML = config.footer;
            footer.appendChild(textoFooter);
        }

        if (footer.innerText.length > 0) {
            footer.classList.add(config.tema);
            footer.setAttribute('id', 'footer');
            historia.appendChild(footer);
        }

        mapboxgl.accessToken = config.tokenDeAcceso;

        let map = new mapboxgl.Map({
            container: 'map',
            style: config.style,
            center: config.capitulos[0].ubicacion.center,
            zoom: config.capitulos[0].ubicacion.zoom,
            bearing: config.capitulos[0].ubicacion.bearing,
            pitch: config.capitulos[0].ubicacion.inclinacion,
            interactive: false,
            projection: config.projection
        });

        // Create a inset map if enabled in config.js
        if (config.inset) {
            map.addControl(
                new GlobeMinimap({ ...config.insetOptions }),
                config.insetPosition
            );
        }

        if (config.mostrarMarcadores) {
            let marker = new mapboxgl.Marker({ color: config.markerColor });
            marker.setLngLat(config.capitulos[0].ubicacion.center).addTo(map);
        }

        // instanciar el scrollama
        let scroller = scrollama();


        map.on("load", function () {
            if (config.usarTerreno3d) {
                map.addSource('mapbox-dem', {
                    'type': 'raster-dem',
                    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    'tileSize': 512,
                    'maxzoom': 14
                });
                // add the DEM source as a terrain layer with exaggerated height
                map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

                // add a sky layer that will show when the map is highly pitched
                map.addLayer({
                    'id': 'sky',
                    'type': 'sky',
                    'paint': {
                        'sky-type': 'atmosphere',
                        'sky-atmosphere-sun': [0.0, 0.0],
                        'sky-atmosphere-sun-intensity': 15
                    }
                });
            };

            // setup the instance, pass callback functions
            scroller
                .setup({
                    step: '.step',
                    offset: 0.5,
                    progress: true
                })
                .onStepEnter(async response => {
                    let capituloActual = config.capitulos.findIndex(chap => chap.id === response.element.id);
                    let capitulo = config.capitulos[capituloActual];

                    response.element.classList.add('active');
                    map[capitulo.mapAnimation || 'flyTo'](capitulo.ubicacion);

                    if (config.mostrarMarcadores) {
                        marker.setLngLat(capitulo.ubicacion.center);
                    }
                    if (capitulo.onChapterEnter.length > 0) {
                        capitulo.onChapterEnter.forEach(setLayerOpacity);
                    }
                    if (capitulo.callback) {
                        window[capitulo.callback]();
                    }
                    if (capitulo.rotarAnimacion) {
                        map.once('moveend', () => {
                            const numeroRotacion = map.getBearing();
                            map.rotateTo(numeroRotacion + 180, {
                                duration: 30000, easing: function (t) {
                                    return t;
                                }
                            });
                        });
                    }
                    if (config.auto) {
                        let capituloSiguiente = (capituloActual + 1) % config.capitulos.length;
                        map.once('moveend', () => {
                            document.querySelectorAll('[data-scrollama-index="' + capituloSiguiente.toString() + '"]')[0].scrollIntoView();
                        });
                    }
                })
                .onStepExit(response => {
                    let capitulo = config.capitulos.find(chap => chap.id === response.element.id);
                    response.element.classList.remove('active');
                    if (capitulo.onChapterExit.length > 0) {
                        capitulo.onChapterExit.forEach(setLayerOpacity);
                    }
                });


            if (config.auto) {
                document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
            }
        });