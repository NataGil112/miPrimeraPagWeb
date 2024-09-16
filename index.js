let data = {
    dataJson: getJson(), // Carga inicial del JSON
    jsonAnterior: null, // ??????Aquí se almacenará el JSON anterior
    // dataMunicipios :  getMunicipios(),

    preInit: function () {
        // this.dataJson = getJson();
        this.dataArrayLineas = getIndicadoresMeses();
        this.initGrafico1();
        this.initGrafico2();
        this.initGrafico3();
        this.initGrafico4();
        this.initGrafico5();
        this.initGrafico6();
        this.initGrafico7();
        this.initGrafico8();
        this.initGrafico9();
        this.showModal();
        this.dataMunicipios =  getMunicipios();
    },

    actualizarJson: function (nuevoJson) {
        this.jsonAnterior = this.dataJson;
        this.dataJson = nuevoJson; // Actualiza el JSON existente
        console.log("JSON actualizado:", this.dataJson);

        this.initGrafico1();
        this.initGrafico2();
        this.initGrafico3();
        this.initGrafico4();
        this.initGrafico5();
        this.initGrafico6();
        this.initGrafico7();
        this.initGrafico8();
        this.initGrafico9();
    },

    restaurarJsonAnterior: function () {
        if (this.jsonAnterior) {
            this.dataJson = this.jsonAnterior; // Reemplaza con el JSON anterior
            console.log("JSON restaurado:", this.dataJson);

            this.initGrafico1();
            this.initGrafico2();
            this.initGrafico3();
            this.initGrafico4();
            this.initGrafico5();
            this.initGrafico6();
            this.initGrafico7();
            this.initGrafico8();
            this.initGrafico9();
        }
    },

    // GRAFICO 1 BARRAS ______________________________________________

    // Define la función para inicializar el gráfico
    initGrafico1: function () {
        let mascSubsidiado = 0;
        let mascContributivo = 0;
        let femSubsidiado = 0;
        let femContributivo = 0;

        this.dataJson.forEach(function (element) {
            if (element.sexo === "M" && element.regimen === "sub") {
                mascSubsidiado++;
            }
            if (element.sexo === "M" && element.regimen === "cont") {
                mascContributivo++;
            }
            if (element.sexo === "F" && element.regimen === "sub") {
                femSubsidiado++;
            }
            if (element.sexo === "F" && element.regimen === "cont") {
                femContributivo++;
            }
        });

        Highcharts.chart("container1", {
            chart: {
                type: "column",
                borderRadius: "15",
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0, // Desplazamiento horizontal
                    offsetY: 0, // Desplazamiento vertical
                    opacity: 0.6, // Opacidad del sombreado
                    width: 5,
                },
            },
            title: {
                text: "",
            },
            subtitle: {
                text: "",
            },
            xAxis: {
                categories: ["Masculino", "Femenino"],
                crosshair: true,
                accessibility: {
                    description: "Gender",
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Total S/C",
                },
            },
            tooltip: {
                valueSuffix: " Personas",
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    events: {
                        click: function (event) {
                            const category = event.point.category;
                            const seriesName = event.point.series.name;

                            // Filtrar datos para el modal
                            const filteredData = data.dataJson.filter(
                                (item) =>
                                    item.sexo === (category === "Masculino" ? "M" : "F") &&
                                    item.regimen ===
                                    (seriesName === "Subsidiado" ? "sub" : "cont")
                            );

                            // Mostrar datos en el modal
                            data.showModal(category, seriesName, filteredData);
                        },
                    },
                },
            },
            series: [
                {
                    name: "Subsidiado",
                    data: [mascSubsidiado, femSubsidiado],
                    color: "pink",
                },
                {
                    name: "Contributivo",
                    data: [mascContributivo, femContributivo],
                    color: "#3df0da",
                },
            ],
        });

        // Modal1
        var modal1 = document.getElementById("infoModal1");
        var span = document.getElementsByClassName("close1")[0];

        span.onclick = function () {
            modal1.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target == modal1) {
                modal1.style.display = "none";
            }
        };
    },

    showModal: function (category, seriesName, data) {
        // data = getJson();

        const filteredData = data.filter(
            (item) =>
                item.sexo === (category === "Masculino" ? "M" : "F") &&
                item.regimen === (seriesName === "Subsidiado" ? "sub" : "cont")
        );
        // Actualizar el título del modal
        document.getElementById(
            "modalTitle1"
        ).innerText = `Régimen ${seriesName} - Género ${category}`;

        // Llenar la tabla del modal con los datos filtrados
        var tableBody = document.getElementById("modalTableBody");
        tableBody.innerHTML = ""; // Limpiar el contenido existente

        filteredData.forEach((item) => {
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.tipoId}</td>
                <td>${item.numeroId}</td>
                <td>${item.sexo}</td>
                <td>${item.regimen}</td>
            `;
            tableBody.appendChild(row);
        });

        // Mostrar el modal
        document.getElementById("infoModal1").style.display = "block";

        document.addEventListener("DOMContentLoaded", function () {
            // Inicializar gráfico con datos (asegúrate de que 'data' esté definido correctamente)
            initGrafico1();
        });
    },

    // GRAFICO 2 LINEAS ___________________________________________________

    initGrafico2: function () {
        let indi1 = this.dataArrayLineas[0];
        let indi2 = this.dataArrayLineas[1];

        console.log(indi1);

        Highcharts.chart("container2", {
            chart: {
                type: "line",
                borderRadius: "15",
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0, // Desplazamiento horizontal
                    offsetY: 0, // Desplazamiento vertical
                    opacity: 0.6, // Opacidad del sombreado
                    width: 5,
                },
            },
            title: {
                text: "",
            },
            subtitle: {
                text: "",
            },
            xAxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                    },
                    enableMouseTracking: true, // Habilita el seguimiento del ratón
                    events: {
                        click: function (event) {
                            const category = event.point.category; // Mes
                            const seriesName = event.point.series.name; // Nombre de la serie
                            const value = event.point.y; // Valor

                            // Muestra el contenido en el modal y abre el modal
                            const ventana = document.getElementById("ventana");
                            ventana.innerText = `Regimen: ${seriesName}\nMes: ${category}\nCantidad: ${value}`;

                            // Usa EasyUI para abrir el modal
                            $("#ventana").window("open");
                        },
                    },
                },
            },
            series: [
                {
                    name: "Subsidiado",
                    data: [
                        indi1.Jan,
                        indi1.Feb,
                        indi1.Mar,
                        indi1.Apr,
                        indi1.May,
                        indi1.Jun,
                        indi1.Jul,
                        indi1.Aug,
                        indi1.Sep,
                        indi1.Oct,
                        indi1.Nov,
                        indi1.Dec,
                    ],
                    color: "orange",
                },
                {
                    name: "Contributivo",
                    data: [
                        indi2.Jan,
                        indi2.Feb,
                        indi2.Mar,
                        indi2.Apr,
                        indi2.May,
                        indi2.Jun,
                        indi2.Jul,
                        indi2.Aug,
                        indi2.Sep,
                        indi2.Oct,
                        indi2.Nov,
                        indi2.Dec,
                    ],
                    color: "#25f718",
                },
            ],
        });
    },

    // GRAFICO 3 TORTA ______________________________________________

    initGrafico3: function () {
        let perSubsidiado = 0;
        let perContributivo = 0;
        this.dataJson.forEach(function (element) {
            if (element.regimen === "sub") {
                perSubsidiado++;
            }
            if (element.regimen === "cont") {
                perContributivo++;
            }
        });

        // console.log(perContributivo);
        // console.log(perSubsidiado);
        (function (H) {
            H.seriesTypes.pie.prototype.animate = function (init) {
                const series = this,
                    chart = series.chart,
                    points = series.points,
                    { animation } = series.options,
                    { startAngleRad } = series;

                function fanAnimate(point, startAngleRad) {
                    const graphic = point.graphic,
                        args = point.shapeArgs;

                    if (graphic && args) {
                        graphic
                            // Set inital animation values
                            .attr({
                                start: startAngleRad,
                                end: startAngleRad,
                                opacity: 1,
                            })
                            // Animate to the final position
                            .animate(
                                {
                                    start: args.start,
                                    end: args.end,
                                },
                                {
                                    duration: animation.duration / points.length,
                                },
                                function () {
                                    // On complete, start animating the next point
                                    if (points[point.index + 1]) {
                                        fanAnimate(points[point.index + 1], args.end);
                                    }
                                    // On the last point, fade in the data labels, then
                                    // apply the inner size
                                    if (point.index === series.points.length - 1) {
                                        series.dataLabelsGroup.animate(
                                            {
                                                opacity: 1,
                                            },
                                            void 0,
                                            function () {
                                                points.forEach((point) => {
                                                    point.opacity = 1;
                                                });
                                                series.update(
                                                    {
                                                        enableMouseTracking: true,
                                                    },
                                                    false
                                                );
                                                chart.update({
                                                    plotOptions: {
                                                        pie: {
                                                            innerSize: "40%",
                                                            borderRadius: 8,
                                                        },
                                                    },
                                                });
                                            }
                                        );
                                    }
                                }
                            );
                    }
                }

                if (init) {
                    // Hide points on init
                    points.forEach((point) => {
                        point.opacity = 0;
                    });
                } else {
                    fanAnimate(points[0], startAngleRad);
                }
            };
        })(Highcharts);

        Highcharts.chart("container3", {
            chart: {
                type: "pie",
                borderRadius: "15",
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0, // Desplazamiento horizontal
                    offsetY: 0, // Desplazamiento vertical
                    opacity: 0.6, // Opacidad del sombreado
                    width: 5,
                },
            },
            title: {
                text: "",
            },
            subtitle: {
                text: "",
            },
            tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
                point: {
                    valueSuffix: "%",
                },
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.name}</b><br>{point.percentage:.1f}%",
                        distance: 20,
                        style: {
                            textOutline: "none",
                        },
                    },
                    events: {
                        click: function (event) {
                            const name = event.point.name;
                            const value = event.point.y; // Valor del punto

                            // Muestra el contenido en el modal y abre el modal
                            const vtorta = document.getElementById("vtorta");
                            vtorta.innerText = `Regimen: ${name}\nCantidad: ${value}`;

                            // Usa EasyUI para abrir el modal
                            $("#vtorta").window("open");
                        },
                    },
                },
            },
            series: [
                {
                    // Disable mouse tracking on load, enable after custom animation
                    enableMouseTracking: false,
                    animation: {
                        duration: 2000,
                    },
                    colorByPoint: true,
                    data: [
                        {
                            name: "Subsidiado",
                            y: perSubsidiado,
                            color: "#f7b126",
                        },
                        {
                            name: "Contributivo",
                            y: perContributivo,
                            color: "#f7e618",
                        },
                    ],
                },
            ],
        });
    },

    // GRAFICO 4 BARRAS INCLINADAS ____________________________________

    addEdad: function (genero, pos, dataGrafico) {
        let valAnt = 0;

        if (genero == "M") {
            valAnt = dataGrafico[0].data[pos];
            dataGrafico[0].data[pos] = valAnt - 1;
        }

        if (genero == "F") {
            valAnt = dataGrafico[1].data[pos];
            dataGrafico[1].data[pos] = valAnt + 1;
        }
    },

    initGrafico4: function () {
        // this.dataJson = getJson();

        const categories = [
            "0-4",
            "5-9",
            "10-14",
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-40",
            "40-45",
            "45-49",
            "50-54",
            "55-59",
            "60-64",
            "65-69",
            "70-74",
            "75-79",
            "80-84",
            "85+",
        ];

        let dataGrafico = [
            {
                name: "Hombres",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: "Mujeres",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ];

        let arrayData = Array.from(this.dataJson);
        for (let i = 0; i < arrayData.length; i++) {
            const data = arrayData[i];

            let edad = parseInt(data.edad);

            if (edad >= 0 && edad <= 4) {
                this.addEdad(data.sexo, 0, dataGrafico);
            }
            if (edad >= 5 && edad <= 9) {
                this.addEdad(data.sexo, 1, dataGrafico);
            }
            if (edad >= 10 && edad <= 14) {
                this.addEdad(data.sexo, 2, dataGrafico);
            }
            if (edad >= 15 && edad <= 19) {
                this.addEdad(data.sexo, 3, dataGrafico);
            }
            if (edad >= 20 && edad <= 24) {
                this.addEdad(data.sexo, 4, dataGrafico);
            }
            if (edad >= 25 && edad <= 29) {
                this.addEdad(data.sexo, 5, dataGrafico);
            }
            if (edad >= 30 && edad <= 34) {
                this.addEdad(data.sexo, 6, dataGrafico);
            }
            if (edad >= 35 && edad <= 39) {
                this.addEdad(data.sexo, 7, dataGrafico);
            }
            if (edad >= 40 && edad <= 44) {
                this.addEdad(data.sexo, 8, dataGrafico);
            }
            if (edad >= 45 && edad <= 49) {
                this.addEdad(data.sexo, 9, dataGrafico);
            }
            if (edad >= 50 && edad <= 54) {
                this.addEdad(data.sexo, 10, dataGrafico);
            }
            if (edad >= 55 && edad <= 59) {
                this.addEdad(data.sexo, 11, dataGrafico);
            }
            if (edad >= 60 && edad <= 64) {
                this.addEdad(data.sexo, 12, dataGrafico);
            }
            if (edad >= 65 && edad <= 69) {
                this.addEdad(data.sexo, 13, dataGrafico);
            }
            if (edad >= 70 && edad <= 74) {
                this.addEdad(data.sexo, 14, dataGrafico);
            }
            if (edad >= 75 && edad <= 79) {
                this.addEdad(data.sexo, 15, dataGrafico);
            }
            if (edad >= 80 && edad <= 84) {
                this.addEdad(data.sexo, 16, dataGrafico);
            }
            if (edad >= 85) {
                this.addEdad(data.sexo, 17, dataGrafico);
            }
        }

        Highcharts.Templating.helpers.abs = (value) => Math.abs(value);

        // Age categories

        Highcharts.chart("container4", {
            chart: {
                type: "bar",
                borderRadius: "15",
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0, // Desplazamiento horizontal
                    offsetY: 0, // Desplazamiento vertical
                    opacity: 0.6, // Opacidad del sombreado
                    width: 5,
                },
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: "{index}. Age {xDescription}, {value}%.",
                },
            },
            xAxis: [
                {
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1,
                    },
                    accessibility: {
                        description: "Age (male)",
                    },
                },
                {
                    // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1,
                    },
                    accessibility: {
                        description: "Age (female)",
                    },
                },
            ],
            yAxis: {
                title: {
                    text: null,
                },
                labels: {
                    format: "{abs value}%",
                },
                accessibility: {
                    description: "Percentage population",
                    rangeDescription: "Range: 0 to 5%",
                },
            },

            plotOptions: {
                series: {
                    stacking: "normal",
                    borderRadius: "50%",
                    events: {
                        click: function (event) {
                            const seriesName = event.point.series.name;
                            const value = event.point.y; // Valor del punto

                            // Muestra el contenido en el modal y abre el modal
                            const drawerContent = document.getElementById("drawerContent");
                            drawerContent.innerText = `Regimen: ${seriesName}\nCantidad de personas: ${value}`;

                            // Usa EasyUI para abrir el modal
                            $("#edad").window("open");
                        },
                    },
                },
            },

            tooltip: {
                format:
                    "<b>{series.name}, age {point.category}</b><br/>" +
                    "Population: {(abs point.y):.2f}%",
            },

            series: dataGrafico,
        });
    },

    // GRAFICO 5 CUADRITOS _______________________________________

    initGrafico5: function () {
        let med = 0;
        let bell = 0;
        let bogt = 0;
        let past = 0;
        let cart = 0;
        let cal = 0;
        let buca = 0;

        this.dataJson.forEach(function (element) {
            if (element.ciudad === "medellin") {
                med++;
            }
            if (element.ciudad === "bogota") {
                bogt++;
            }
            if (element.ciudad === "bello") {
                bell++;
            }
            if (element.ciudad === "pasto") {
                past++;
            }
            if (element.ciudad === "cartagena") {
                cart++;
            }
            if (element.ciudad === "bucaramanga") {
                buca++;
            }
            if (element.ciudad === "cali") {
                cal++;
            }
        });

        Highcharts.chart("container5", {
            title: { text: "" },
            chart: {
                borderRadius: "15",
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0, // Desplazamiento horizontal
                    offsetY: 0, // Desplazamiento vertical
                    opacity: 0.6, // Opacidad del sombreado
                    width: 5,
                },
            },
            subtitle: { text: "" },
            plotOptions: {
                series: {
                    events: {
                        click: function (event) {
                            const seriesName = event.point.name;
                            const value = event.point.value; // Valor del punto

                            const cuadritos = document.getElementById("cuadritos");
                            cuadritos.innerText = `Ciudad: ${seriesName}\nCantidad: ${value}`;

                            // Usa EasyUI para abrir el modal
                            $("#cuadros").window("open");
                        },
                    },
                },
            },
            series: [
                {
                    type: "treemap",
                    layoutAlgorithm: "squarified",
                    clip: false,
                    data: [
                        {
                            name: "Medellin",
                            value: med,
                            color: "#96e543",
                        },
                        {
                            name: "Bello",
                            value: bell,
                            color: "#f1f429",
                        },
                        {
                            name: "Bogota",
                            value: bogt,
                            color: "#48be2b",
                        },
                        {
                            name: "Pasto",
                            value: past,
                            color: "#0a6609",
                        },
                        {
                            name: "Bucaramanga",
                            value: buca,
                            color: "blue",
                        },
                        {
                            name: "Cali",
                            value: cal,
                            color: "yellow",
                        },
                        {
                            name: "Cartagena",
                            value: cart,
                            color: "pink",
                        },
                    ],
                },
            ],
        });
    },

    // GRAFICO 6 MAPA BLANCO __________________________________________

    initGrafico6: function () {
        // Si ya existe un gráfico en el contenedor, destrúyelo primero
        if (
            Highcharts.charts[
            Highcharts.attr(
                document.getElementById("container6"),
                "data-highcharts-chart"
            )
            ]
        ) {
            Highcharts.charts[
                Highcharts.attr(
                    document.getElementById("container6"),
                    "data-highcharts-chart"
                )
            ].destroy();
        }

        let objMunicipios = {};
        this.dataJson.forEach(function (item) {
            objMunicipios[item.ciudad] = item.coordenadas;
        });

        // console.log(objMunicipios);

        let arrayMun = [];

        for (const key in objMunicipios) {
            let nombreMun = key;
            let coord = objMunicipios[key];

            let obj = {};
            obj.name = nombreMun;
            obj.lat = parseFloat(coord.split(",")[0]);
            obj.lon = parseFloat(coord.split(",")[1]);
            arrayMun.push(obj);
        }

        // console.log(arrayMun);

        (async () => {
            const topology = await fetch(
                "https://code.highcharts.com/mapdata/countries/co/co-all.topo.json"
            ).then((response) => response.json());

            // Initialize the chart
            Highcharts.mapChart("container6", {
                chart: {
                    map: topology,
                    borderRadius: "15",
                    borderWidth: 1,
                    borderColor: "#000000",
                    shadow: {
                        color: "rgba(255, 0, 0, 0.6)",
                        offsetX: 0, // Desplazamiento horizontal
                        offsetY: 0, // Desplazamiento vertical
                        opacity: 0.6, // Opacidad del sombreado
                        width: 5,
                    },
                },
                title: {
                    text: "",
                },
                subtitle: {
                    text: "",
                },

                accessibility: {
                    description:
                        "Map where city locations have been defined using " +
                        "latitude/longitude.",
                },

                mapNavigation: {
                    enabled: true,
                },

                tooltip: {
                    headerFormat: "",
                    pointFormat:
                        "<b>{point.name}</b><br>Lat: {point.lat}, Lon: " + "{point.lon}",
                },

                plotOptions: {
                    series: {
                        events: {
                            click: function (event) {
                                const cityName = event.point.name; // Nombre de la ciudad
                                const lat = event.point.lat;
                                const lon = event.point.lon;

                                // Actualiza el contenido del modal
                                document.getElementById(
                                    "modalContent"
                                ).innerHTML = `Ciudad: ${cityName}<br>Lat: ${lat}, Lon: ${lon}`;

                                // Abre el modal usando EasyUI
                                $("#puntitos").window("open");
                            },
                        },
                    },
                },

                series: [
                    {
                        // Use the gb-all map with no data as a basemap
                        name: "Great Britain",
                        borderColor: "#A0A0A0",
                        nullColor: "rgba(200, 200, 200, 0.3)",
                        showInLegend: false,
                    },
                    {
                        name: "Separators",
                        type: "mapline",
                        nullColor: "#707070",
                        showInLegend: false,
                        enableMouseTracking: false,
                        accessibility: {
                            enabled: false,
                        },
                    },
                    {
                        // Specify points using lat/lon
                        type: "mappoint",
                        name: "Ciudades",
                        accessibility: {
                            point: {
                                valueDescriptionFormat:
                                    "{xDescription}. Lat: " +
                                    "{point.lat:.2f}, lon: {point.lon:.2f}.",
                            },
                        },
                        color: Highcharts.getOptions().colors[1],
                        data: arrayMun,
                    },
                ],
            });
        })();
    },

    // GRAFICO 7 MAPA DE COLORES _______________________________
    initGrafico7: function () {
        (async () => {
            const topology = await fetch(
                "https://code.highcharts.com/mapdata/countries/co/co-all.topo.json"
            ).then((response) => response.json());

            // Prepare demo data. The data is joined to map using value of 'hc-key'
            // property by default. See API docs for 'joinBy' for more info on linking
            // data and map.
            let data = [
                ["co-sa", 10],
                ["co-ca", 11],
                ["co-na", 12],
                ["co-ch", 13],
                ["co-3653", 14],
                ["co-to", 15],
                ["co-cq", 16],
                ["co-hu", 17],
                ["co-pu", 18],
                ["co-am", 19],
                ["co-bl", 20],
                ["co-vc", 21],
                ["co-su", 22],
                ["co-at", 23],
                ["co-ce", 24],
                ["co-lg", 25],
                ["co-ma", 26],
                ["co-ar", 27],
                ["co-ns", 28],
                ["co-cs", 29],
                ["co-gv", 30],
                ["co-me", 31],
                ["co-vp", 32],
                ["co-vd", 33],
                ["co-an", 1],
                ["co-co", 35],
                ["co-by", 36],
                ["co-st", 37],
                ["co-cl", 38],
                ["co-cu", 39],
                ["co-1136", 40],
                ["co-ri", 41],
                ["co-qd", 42],
                ["co-gn", 43],
            ];

            // data = [];
            // Create the chart
            Highcharts.mapChart("container7", {
                chart: {
                    map: topology,
                    borderRadius: "15",
                    borderWidth: 1,
                    borderColor: "#000000",
                    shadow: {
                        color: "rgba(255, 0, 0, 0.6)",
                        offsetX: 0, // Desplazamiento horizontal
                        offsetY: 0, // Desplazamiento vertical
                        opacity: 0.6, // Opacidad del sombreado
                        width: 5,
                    },
                },

                title: {
                    text: "",
                },

                subtitle: {
                    text: "",
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: "bottom",
                    },
                },

                plotOptions: {
                    series: {
                        events: {
                            click: function (event) {
                                console.log(event.point);
                            },
                        },
                    },
                },

                colorAxis: {
                    min: 0,
                    max: 34,
                    stops: [
                        [0.2, "#188e2a"], // Green
                        [0.5, "#fee401"], // Yellow
                        [1, "#df1309"], // Red
                    ],
                    // minColor: 'green',
                    // maxColor: 'red'
                },

                series: [
                    {
                        data: data,
                        name: "Random data",
                        states: {
                            hover: {
                                color: "#BADA55",
                            },
                        },
                        dataLabels: {
                            enabled: true,
                            format: "{point.name}",
                        },
                    },
                ],
            });
        })();
    },

    // GRAFICO MUNICIPIOS________________________________________________________

    // let muni = this.dataMunicipios[0].objects.MGN_ANM_MPIOS.geometries[0].properties.MPIO_CNMBR;
    // console.log(muni);



    pintarMuns: function (data, nombreDepartamento) {
        Highcharts.mapChart("container9", {
            chart: {
                // Si deseas cambiar el mapa, puedes añadir la propiedad map aquí.
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#000000",
                shadow: {
                    color: "rgba(255, 0, 0, 0.6)",
                    offsetX: 0,
                    offsetY: 0,
                    opacity: 0.6,
                    width: 5,
                },
            },
    
            title: {
                text: "Municipios de Colombia",
            },
    
            subtitle: {
                text: `Departamento: ${nombreDepartamento}`,
            },
    
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: "bottom",
                },
            },
    
            plotOptions: {
                series: {
                    events: {
                        click: function (event) {
                            console.log(event.point);
                        },
                    },
                },
            },
    
            colorAxis: {
                min: 0,
                max: 34,
                stops: [
                    [0.2, "#188e2a"],
                    [0.5, "#fee401"],
                    [1, "#df1309"],
                ],
            },
    
            series: [
                {
                    data: data,
                    name: "Municipios",
                    states: {
                        hover: {
                            color: "#BADA55",
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                    },
                },
            ],
        });
    },
    
    initGrafico8: function () {
        let me = this;
        let dataMunicipios = getMunicipios();
    
        const drilldown = async function (e) {
            if (!e.seriesOptions) {
                const dptoCode = e.point.properties.DPTO_CCDGO;
                const nombreDepartamento = e.point.properties.DPTO_CNMBR;
    
                // Filtrar los municipios correspondientes al departamento seleccionado
                const municipiosTopoJSON = {
                    type: "Topology",
                    objects: {
                        municipios: {
                            type: "GeometryCollection",
                            geometries: dataMunicipios.objects.MGN_ANM_MPIOS.geometries.filter(
                                (municipio) => municipio.properties.DPTO_CCDGO === dptoCode
                            ),
                        },
                    },
                    arcs: dataMunicipios.arcs,
                    transform: dataMunicipios.transform,
                };
    
                // Convertir TopoJSON a GeoJSON
                const municipiosGeoJSON = topojson.feature(
                    municipiosTopoJSON,
                    municipiosTopoJSON.objects.municipios
                );
    
                // Convertir GeoJSON a un formato que Highcharts pueda utilizar
                const data = Highcharts.geojson(municipiosGeoJSON);
    
                // Añadir un valor a cada punto
                data.forEach((d, i) => {
                    d.value = i;
                    d.name = d.properties.MPIO_CNMBR;
                });
    
                me.pintarMuns(data, nombreDepartamento);
    
                // chart.addSeriesAsDrilldown(e.point, {
                //     name: e.point.name,
                //     data,
                //     dataLabels: {
                //     enabled: true,
                //     format: '{point.properties.MPIO_CNMBR}'
                //     }
                // });
                
            }
        };
    
        (async () => {
            const departamentosGeoJSON = topojson.feature(
                dataMunicipios,
                dataMunicipios.objects.MGN_ANM_DPTOS
            );
    
            if (departamentosGeoJSON) {
                const data = Highcharts.geojson(departamentosGeoJSON);
    
                data.forEach((d, i) => {
                    d.drilldown = d.properties["DPTO_CCDGO"];
                    d.value = i;
                });
    
                Highcharts.mapChart("container8", {
                    chart: {
                        borderRadius: 15,
                        borderWidth: 1,
                        borderColor: "#000000",
                        shadow: {
                            color: "rgba(255, 0, 0, 0.6)",
                            offsetX: 0,
                            offsetY: 0,
                            opacity: 0.6,
                            width: 5,
                        },
                        events: {
                            drilldown,
                        },
                    },
    
                    title: {
                        text: "Departamentos de Colombia",
                    },
    
                    colorAxis: {
                        min: 0,
                        minColor: "#E6E7E8",
                        maxColor: "#005645",
                    },
    
                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: "bottom",
                        },
                    },
    
                    plotOptions: {
                        map: {
                            states: {
                                hover: {
                                    color: "#EEDD66",
                                },
                            },
                        },
                    },
    
                    series: [
                        {
                            data,
                            name: "Colombia",
                            dataLabels: {
                                enabled: true,
                                format: "{point.properties.DPTO_CNMBR}",
                            },
                        },
                    ],
    
                    drilldown: {
                        activeDataLabelStyle: {
                            color: "#FFFFFF",
                            textDecoration: "none",
                            textOutline: "1px #000000",
                        },
                        breadcrumbs: {
                            floating: true,
                        },
                        drillUpButton: {
                            relativeTo: "spacingBox",
                            position: {
                                x: 0,
                                y: 60,
                            },
                        },
                    },
                });
            } else {
                console.log("Error al cargar los datos del mapa.");
            }
        })();
    }
    

    
};

// Esconder columna de los filtros
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".btnMenu");
    const filtro = document.querySelector(".filtros");

    button.addEventListener("click", function () {
        if (filtro.style.display === "none") {
            filtro.style.display = "block"; // Muestra la columna si está oculta
        } else {
            filtro.style.display = "none"; // Oculta la columna si está visible
        }
    });
});

// NUEVO JSON __________
document.getElementById("json").addEventListener("click", function () {
    let nuevoJson = [
        {
            tipoId: "cc",
            numeroId: "130",
            sexo: "M",
            edad: "45",
            ciudad: "cali",
            coordenadas: "3.4372,-76.5225",
            regimen: "sub",
            patologia: "S",
            indicador: "80",
        },
        {
            tipoId: "ce",
            numeroId: "131",
            sexo: "F",
            edad: "22",
            ciudad: "cartagena",
            coordenadas: "10.3910,-75.4794",
            regimen: "sub",
            patologia: "N",
            indicador: "15",
        },
        {
            tipoId: "pt",
            numeroId: "132",
            sexo: "F",
            edad: "60",
            ciudad: "bucaramanga",
            coordenadas: "7.1253,-73.1198",
            regimen: "sub",
            patologia: "N",
            indicador: "60",
        },
        {
            tipoId: "ce",
            numeroId: "133",
            sexo: "F",
            edad: "15",
            ciudad: "cartagena",
            coordenadas: "10.3910,-75.4794",
            regimen: "cont",
            patologia: "N",
            indicador: "15",
        },
        {
            tipoId: "pt",
            numeroId: "134",
            sexo: "M",
            edad: "63",
            ciudad: "bucaramanga",
            coordenadas: "7.1253,-73.1198",
            regimen: "sub",
            patologia: "N",
            indicador: "60",
        },
        {
            tipoId: "pt",
            numeroId: "135",
            sexo: "M",
            edad: "50",
            ciudad: "amazonas",
            coordenadas: "-1.5,-71.5",
            regimen: "sub",
            patologia: "N",
            indicador: "60",
        },
    ];

    data.actualizarJson(nuevoJson);
});

// Evento para restaurar el JSON anterior
document.getElementById("antJson").addEventListener("click", function () {
    data.restaurarJsonAnterior();
});
