const app = document.getElementById('ayuda_cont');
const app2 = document.getElementById('ayuda_cont2');
const app3 = document.getElementById('lenguajeVideos');

const container = document.createElement('div');
container.setAttribute('class', 'row departamentos_CCleaner');
const container2 = document.createElement('div');
container2.setAttribute('class', 'row departamentos_CCleaner2');
const container3 = document.createElement('div');
container3.setAttribute('class', 'row departamentos_CCleaner3');

app.appendChild(container);
app2.appendChild(container2);
app3.appendChild(container3);

var request = new XMLHttpRequest();

function requestAyuda(departamentoEscogido) {

    departamentoEscogidoFinal = "https://www.datos.gov.co/resource/p4x9-d7hz.json?departamento=" + departamentoEscogido

    request.open('GET', departamentoEscogidoFinal, true),

        request.onload = function() {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                i = 0;
                data.forEach((object, i) => {

                    if (!object.nombredelaorganizaciony_ocolectivo) {
                        object.nombredelaorganizaciony_ocolectivo = "";
                    }

                    if (!object.municipio) {
                        object.municipio = "";
                    }

                    if (!object.departamento) {
                        object.departamento = "";
                    }

                    if (!object.direccion) {
                        object.direccion = "";
                    }

                    if (!object.correoelectronico) {
                        object.correoelectronico = "";
                    }

                    const card = document.createElement('div');
                    card.setAttribute('class', 'col s3 center-align');

                    const card2 = document.createElement("div");
                    card2.setAttribute("class", "card")

                    const card3 = document.createElement("div");
                    card3.setAttribute("class", "card-content")

                    const h2 = document.createElement('p');
                    h2.setAttribute("class", "title");
                    h2.textContent = object.nombredelaorganizaciony_ocolectivo;

                    const h3 = document.createElement("p");
                    h3.setAttribute("class", "subtitle");
                    h3.textContent = `Municipio: ${object.municipio} - ${object.departamento}`


                    const p = document.createElement('p');
                    p.setAttribute("class", "descripcion");
                    p.textContent = `${object.direccion}`;

                    const p2 = document.createElement('p');
                    p2.setAttribute("class", "descripcion");
                    p2.textContent = `${object.correoelectronico}`;

                    const column12 = document.createElement("div");
                    column12.setAttribute('class', 'col s12');


                    container.appendChild(card);
                    card.appendChild(card2);
                    card2.appendChild(card3);
                    card3.appendChild(h2);
                    card3.appendChild(h3);
                    card3.appendChild(p);
                    card3.appendChild(p2);
                    if ((i + 1) % 4 === 0) {
                        console.log(i);
                        container.appendChild(column12)
                    }
                });
            } else {
                console.log('error');
            }


        }

    request.send()

    // Send request

}

function requestAyuda2(sectorEscogidoFinal) {
    request.open('GET', sectorEscogidoFinal, true),
        request.onload = function() {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                i = 0;
                data.forEach((object, i) => {

                    if (!object.nombremunicipio) {
                        object.nombremunicipio = "";
                    }

                    if (!object.nombreoferta) {
                        object.nombreoferta = "";
                    }

                    if (!object.nombredepartamento) {
                        object.nombredepartamento = "";
                    }

                    if (!object.telefono1contacto) {
                        object.telefono1contacto = "";
                    }

                    if (!object.correoelectronico) {
                        object.correoelectronico = "";
                    }

                    const card = document.createElement('div');
                    card.setAttribute('class', 'col s3 center-align');

                    const card2 = document.createElement("div");
                    card2.setAttribute("class", "card")

                    const card3 = document.createElement("div");
                    card3.setAttribute("class", "card-content")

                    const h2 = document.createElement('p');
                    h2.setAttribute("class", "title");
                    h2.textContent = object.nombreoferta;
                    if (h2.textContent === "Educacion incluusiva") {
                        h2.textContent = "Educación inclusiva"
                    }

                    const h3 = document.createElement("p");
                    h3.setAttribute("class", "subtitle");
                    h3.textContent = `Municipio: ${object.nombremunicipio} - ${object.nombredepartamento}`


                    const p = document.createElement('p');
                    p.setAttribute("class", "descripcion");
                    p.textContent = `${object.telefono1contacto}`;

                    const p2 = document.createElement('p');
                    p2.setAttribute("class", "descripcion");
                    p2.textContent = `${object.correoelectronico}`;

                    const column12 = document.createElement("div");
                    column12.setAttribute('class', 'col s12');


                    container2.appendChild(card);
                    card.appendChild(card2);
                    card2.appendChild(card3);
                    card3.appendChild(h2);
                    card3.appendChild(h3);
                    card3.appendChild(p);
                    card3.appendChild(p2);
                    if ((i + 1) % 4 === 0) {
                        console.log(i);
                        container2.appendChild(column12)
                    }
                });
            } else {
                console.log('error');
            }


        }

    request.send()

    // Send request

}

function requestCCleaner1() {
    document.getElementsByClassName("departamentos_CCleaner")[0].innerHTML = ""
}

function requestCCleaner2() {
    document.getElementsByClassName("departamentos_CCleaner2")[0].innerHTML = ""
}

function requestCCleaner3() {
    document.getElementsByClassName("departamentos_CCleaner3")[0].innerHTML = ""
}

// AYUDA CIVIL

for (let i = 0; i < document.getElementsByClassName("dropdown-content__option").length; i++) {
    document.getElementsByClassName("dropdown-content__option")[i].addEventListener("click", function() {
        // Limpia el caché que no existe, y también los datos anteriores (mal chiste)
        requestCCleaner1();
        // Aquí había un bug terrible :v
        requestAyuda(document.getElementsByClassName("dropdown-content__option")[i].textContent);
    })
}

// AYUDA PUBLICA (sufijo: _d2 y _d3)

for (let i = 0; i < document.getElementsByClassName("dropdown-content__option_d2").length; i++) {
    document.getElementsByClassName("dropdown-content__option_d2")[i].addEventListener("click", function() {
        requestCCleaner2();
        requestAyuda2(`https://www.datos.gov.co/resource/pz9b-bwgg.json?sector=${document.getElementsByClassName("dropdown-content__option_d2")[i].textContent}`);


        for (let j = 0; j < document.getElementsByClassName("dropdown-content__option_d3").length; j++) {
            document.getElementsByClassName("dropdown-content__option_d3")[j].addEventListener("click", function() {
                requestCCleaner2();
                requestAyuda2(`https://www.datos.gov.co/resource/pz9b-bwgg.json?nombredepartamento=${document.getElementsByClassName("dropdown-content__option_d3")[j].textContent}&sector=${document.getElementsByClassName("dropdown-content__option_d2")[i].textContent}`);
            })

        }
    })
}

// BOTÓN OCULTAR 

document.getElementsByClassName("dropdown-ocultar")[0].addEventListener("click", requestCCleaner1)
document.getElementsByClassName("dropdown-ocultar")[1].addEventListener("click", requestCCleaner2)

// Autoinit de Materialize.js
M.AutoInit();

// Request para Lenguaje de Señas


function validacionCadena(string) {
    var chars = {

        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",

        "à": "a",
        "è": "e",
        "ì": "i",
        "ò": "o",
        "ù": "u",
        "ñ": "n",

        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",

        "À": "A",
        "È": "E",
        "Ì": "I",
        "Ò": "O",
        "Ù": "U",
        "Ñ": "N"
    }

    var expr = /[áàéèíìóòúùñ]/ig;

    var res = string.replace(expr, function(e) { return chars[e] });

    return res;
}


function contadorBusqueda() {

    valorActualContador = document.getElementById("input_text").value,
        // VALOR VALIDADO EN MAYUSCULAS

        valorActualValidated = validacionCadena(valorActualContador).trim().toUpperCase(),
        request.open('GET', `https://www.datos.gov.co/resource/tr7c-jw6y.json`, true),
        request.onload = function() {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                requestCCleaner3();

                i = 0;
                data.forEach((object, i) => {
                    objectValidated = validacionCadena(object.palabra).toUpperCase().trim();

                    if (objectValidated.includes(valorActualValidated)) {
                        console.log(object);

                        if (!object.palabra) {
                            object.palabra = "";
                        }

                        if (!object.urlimagen) {
                            object.urlimagen = "";
                        }

                        if (!object.significadoentexto) {
                            object.significadoentexto = "";
                        }

                        if (!object.descripcionsena) {
                            object.descripcionsena = "";
                        }


                        const card = document.createElement('div');
                        card.setAttribute('class', 'col s3 center-align');

                        const card2 = document.createElement("div");
                        card2.setAttribute("class", "card")

                        const card3 = document.createElement("div");
                        card3.setAttribute("class", "card-content")

                        const h2 = document.createElement('p');
                        h2.setAttribute("class", "title");
                        h2.textContent = object.palabra;

                        const h3 = document.createElement("p");
                        h3.setAttribute("class", "subtitle");
                        h3.innerHTML = `URL: <a href="${object.urlimagen}" target="_blank" class="video_lenguaje_señas">${object.urlimagen}</a>`

                        const p2 = document.createElement('p');
                        p2.setAttribute("class", "descripcion");
                        p2.textContent = `${object.descripcionsena}`;

                        const column12 = document.createElement("div");
                        column12.setAttribute('class', 'col s12');


                        container3.appendChild(card);
                        card.appendChild(card2);
                        card2.appendChild(card3);
                        card3.appendChild(h2);
                        card3.appendChild(h3);
                        card3.appendChild(p2);

                    } else {
                        console.log('error');
                    }
                })
            }
        },

        request.send(), setTimeout(contadorBusqueda, 1000)

}
contadorBusqueda();