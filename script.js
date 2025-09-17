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

        if (config.title) {
            let textoTitulo = document.createElement('h1');
            textoTitulo.innerText = config.title;
            header.appendChild(textoTitulo);
        }

        if (config.subtitle) {
            let textoSubtitulo = document.createElement('h2');
            textoSubtitulo.innerText = config.subtitle;
            header.appendChild(textoSubtitulo);
        }

        if (config.byline) {
            let textoParrafo = document.createElement('p');
            textoParrafo.innerText = config.byline;
            header.appendChild(textoParrafo);
        }

        if (header.innerText.length > 0) {
            header.classList.add(config.theme);
            header.setAttribute('id', 'header');
            historia.appendChild(header);
        }

        config.chapters.forEach((record, idx) => {
            let contenedor = document.createElement('div');
            let capitulo = document.createElement('div');

            if (record.title) {
                let titulo = document.createElement('h3');
                titulo.innerText = record.title;
                capitulo.appendChild(titulo);
            }

            if (record.image) {
                let imagen = new Image();
                imagen.src = record.image;
                capitulo.appendChild(imagen);
            }

            if (record.description) {
                let historia = document.createElement('p');
                historia.innerHTML = record.description;
                capitulo.appendChild(historia);
            }

            contenedor.setAttribute('id', record.id);
            contenedor.classList.add('step');
            if (idx === 0) {
                contenedor.classList.add('active');
            }

            capitulo.classList.add(config.theme);
            contenedor.appendChild(capitulo);
            contenedor.classList.add(alineaciones[record.alignment] || 'centered');
            if (record.hidden) {
                contenedor.classList.add('hidden');
            }
            caracteristicas.appendChild(contenedor);
        });

        historia.appendChild(caracteristicas);

        let footer = document.createElement('div');

        if (config.footer) {
            let footerText = document.createElement('p');
            footerText.innerHTML = config.footer;
            footer.appendChild(footerText);
        }

        if (footer.innerText.length > 0) {
            footer.classList.add(config.theme);
            footer.setAttribute('id', 'footer');
            historia.appendChild(footer);
        }

        mapboxgl.accessToken = config.accessToken;

        let map = new mapboxgl.Map({
            container: 'map',
            style: config.style,
            center: config.chapters[0].location.center,
            zoom: config.chapters[0].location.zoom,
            bearing: config.chapters[0].location.bearing,
            pitch: config.chapters[0].location.pitch,
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

        if (config.showMarkers) {
            let marker = new mapboxgl.Marker({ color: config.markerColor });
            marker.setLngLat(config.chapters[0].location.center).addTo(map);
        }

        // instanciar el scrollama
        let scroller = scrollama();


        map.on("load", function () {
            if (config.use3dTerrain) {
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
                    let capituloActual = config.chapters.findIndex(chap => chap.id === response.element.id);
                    let capitulo = config.chapters[capituloActual];

                    response.element.classList.add('active');
                    map[capitulo.mapAnimation || 'flyTo'](capitulo.location);

                    if (config.showMarkers) {
                        marker.setLngLat(capitulo.location.center);
                    }
                    if (capitulo.onChapterEnter.length > 0) {
                        capitulo.onChapterEnter.forEach(setLayerOpacity);
                    }
                    if (capitulo.callback) {
                        window[capitulo.callback]();
                    }
                    if (capitulo.rotateAnimation) {
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
                        let capituloSiguiente = (capituloActual + 1) % config.chapters.length;
                        map.once('moveend', () => {
                            document.querySelectorAll('[data-scrollama-index="' + capituloSiguiente.toString() + '"]')[0].scrollIntoView();
                        });
                    }
                })
                .onStepExit(response => {
                    let capitulo = config.chapters.find(chap => chap.id === response.element.id);
                    response.element.classList.remove('active');
                    if (capitulo.onChapterExit.length > 0) {
                        capitulo.onChapterExit.forEach(setLayerOpacity);
                    }
                });


            if (config.auto) {
                document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
            }
        });