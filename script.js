// Funciones para cada calculadora
function calcularSINS() {
    const localizacion = parseInt(document.getElementById('localizacion').value);
    const tipoLesion = parseInt(document.getElementById('tipo-lesion').value);
    const colapsoVertebral = parseInt(document.getElementById('colapso-vertebral').value);
    const alineacionVertebral = parseInt(document.getElementById('alineacion-vertebral').value);
    const dolor = parseInt(document.getElementById('dolor').value);
    const elementoPosterior = parseInt(document.getElementById('elemento-posterior').value);
    const puntuacionTotal = localizacion + tipoLesion + colapsoVertebral + alineacionVertebral + dolor + elementoPosterior;
    const resultadoElemento = document.getElementById('resultadoSINS');
    let interpretacion = "";
    if (puntuacionTotal <= 6) {
        interpretacion = "Estable";
    } else if (puntuacionTotal >= 7 && puntuacionTotal <= 12) {
        interpretacion = "Inestabilidad potencial";
    } else {
        interpretacion = "Inestable";
    }
    resultadoElemento.innerText = `Puntuación total: ${puntuacionTotal} - (${interpretacion})`;
}

function mostrarFrankel() {
    const grado = document.getElementById('grado-frankel').value;
    const resultadoElemento = document.getElementById('resultadoFrankel');
    switch (grado) {
        case 'A':
            resultadoElemento.innerText = "Parálisis completa.";
            break;
        case 'B':
            resultadoElemento.innerText = "Paraparesia o cuadriparesia, sin función motora útil.";
            break;
        case 'C':
            resultadoElemento.innerText = "Paraparesia o cuadriparesia con función motora útil, pero no funcional.";
            break;
        case 'D':
            resultadoElemento.innerText = "Paraparesia o cuadriparesia con función motora funcional.";
            break;
        case 'E':
            resultadoElemento.innerText = "Normal. Sin déficit neurológico.";
            break;
        default:
            resultadoElemento.innerText = "Seleccione un grado para ver la interpretación.";
    }
}

function calcularJOA() {
    const motoraBrazos = parseInt(document.getElementById('joa-motora-brazos').value);
    const motoraPiernas = parseInt(document.getElementById('joa-motora-piernas').value);
    const sensitiva = parseInt(document.getElementById('joa-sensitiva').value);
    const esfinter = parseInt(document.getElementById('joa-esfinter').value);
    const puntuacionTotal = motoraBrazos + motoraPiernas + sensitiva + esfinter;
    const resultadoElemento = document.getElementById('resultadoJOA');
    let interpretacion = "";
    if (puntuacionTotal >= 15) {
        interpretacion = "Normal";
    } else if (puntuacionTotal >= 12) {
        interpretacion = "Mielopatía leve";
    } else if (puntuacionTotal >= 8) {
        interpretacion = "Mielopatía moderada";
    } else {
        interpretacion = "Mielopatía severa";
    }
    resultadoElemento.innerText = `Puntuación total: ${puntuacionTotal} - (${interpretacion})`;
}

function mostrarBilsky(grado) {
    const interpretaciones = {
        '0': 'Grado 0: Enfermedad ósea, sin impingement epidural.',
        '1a': 'Grado 1a: Impingement epidural sin deformación del saco tecal.',
        '1b': 'Grado 1b: Deformación del saco tecal sin compresión de la médula.',
        '1c': 'Grado 1c: Deformación del saco tecal con compresión de la médula.',
        '2': 'Grado 2: Compresión de la médula, con LCR visible alrededor.',
        '3': 'Grado 3: Compresión de la médula, sin LCR visible alrededor.'
    };
    const opciones = document.querySelectorAll('.image-option');
    opciones.forEach(opcion => {
        opcion.classList.remove('selected');
    });
    const opcionSeleccionada = document.querySelector(`.image-option[data-grade="${grado}"]`);
    opcionSeleccionada.classList.add('selected');
    const resultadoElemento = document.getElementById('resultadoBilsky');
    resultadoElemento.innerText = interpretaciones[grado];
}

function calcularPola() {
    const neuro = document.getElementById('pola-neuro').value === 'si';
    const abscess = document.getElementById('pola-abscess').value === 'si';
    const instability = document.getElementById('pola-instability').value === 'si';
    const parainvolvement = document.getElementById('pola-parainvolvement').value === 'si';
    const resultadoElemento = document.getElementById('resultadoPola');

    let clasificacion = "No clasificado";
    let tratamiento = "Seleccione las opciones para obtener una clasificación y tratamiento.";

    if (neuro || abscess) {
        if (abscess && neuro && instability) {
            clasificacion = "Tipo C.4";
            tratamiento = "Desbridamiento abierto, descompresión y estabilización.";
        } else if (abscess && neuro) {
            clasificacion = "Tipo C.3";
            tratamiento = "Desbridamiento abierto y descompresión.";
        } else if (abscess && instability) {
            clasificacion = "Tipo C.2";
            tratamiento = "Desbridamiento abierto y estabilización.";
        } else if (abscess) {
            clasificacion = "Tipo C.1";
            tratamiento = "Inmovilización con ortesis rígida o estabilización percutánea con monitoreo clínico-radiológico cercano.";
        } else if (neuro) {
            clasificacion = "Tipo C (Déficit Neurológico sin Absceso)";
            tratamiento = "Descompresión quirúrgica.";
        }
    } else if (instability) {
        if (parainvolvement) {
            clasificacion = "Tipo B.2 o B.3";
            tratamiento = "Inmovilización con ortesis rígida o estabilización percutánea.";
        } else {
            clasificacion = "Tipo B.1";
            tratamiento = "Inmovilización con ortesis rígida o estabilización percutánea.";
        }
    } else {
        if (parainvolvement) {
            clasificacion = "Tipo A.3 o A.4";
            tratamiento = "Inmovilización con ortesis rígida o estabilización percutánea.";
        } else {
            clasificacion = "Tipo A.1 o A.2";
            tratamiento = "Inmovilización con ortesis rígida.";
        }
    }
    
    if (document.getElementById('pola-neuro').value === 'no' && 
        document.getElementById('pola-abscess').value === 'no' && 
        document.getElementById('pola-instability').value === 'no' &&
        document.getElementById('pola-parainvolvement').value === 'no') {
            resultadoElemento.innerHTML = `Clasificación: - <br> Tratamiento Recomendado: -`;
    } else {
        resultadoElemento.innerHTML = `Clasificación: **${clasificacion}**<br>Tratamiento Recomendado: **${tratamiento}**`;
    }
}

// Nueva función para la escala de Nurick
function mostrarNurick() {
    const grado = document.getElementById('nurick-grado').value;
    const resultadoElemento = document.getElementById('resultadoNurick');
    const interpretaciones = {
        '0': 'Signos o síntomas de afectación radicular, sin evidencia de mielopatía.',
        '1': 'Signos de mielopatía sin dificultad al andar.',
        '2': 'Leve dificultad al andar que no impide actividades diarias.',
        '3': 'Dificultad al andar que limita actividades diarias.',
        '4': 'Camina con ayuda.',
        '5': 'Postrado o en silla de ruedas.'
    };
    resultadoElemento.innerText = interpretaciones[grado];
}

function reiniciarCalculadoras() {
    document.getElementById('localizacion').selectedIndex = 0;
    document.getElementById('tipo-lesion').selectedIndex = 0;
    document.getElementById('colapso-vertebral').selectedIndex = 0;
    document.getElementById('alineacion-vertebral').selectedIndex = 0;
    document.getElementById('dolor').selectedIndex = 0;
    document.getElementById('elemento-posterior').selectedIndex = 0;
    calcularSINS();
    document.getElementById('grado-frankel').selectedIndex = 0;
    mostrarFrankel();
    document.getElementById('joa-motora-brazos').selectedIndex = 0;
    document.getElementById('joa-motora-piernas').selectedIndex = 0;
    document.getElementById('joa-sensitiva').selectedIndex = 0;
    document.getElementById('joa-esfinter').selectedIndex = 0;
    calcularJOA();
    const opcionesBilsky = document.querySelectorAll('.image-option');
    opcionesBilsky.forEach(opcion => {
        opcion.classList.remove('selected');
    });
    document.getElementById('resultadoBilsky').innerText = "Seleccione un grado para ver la interpretación.";
    document.getElementById('pola-neuro').selectedIndex = 0;
    document.getElementById('pola-abscess').selectedIndex = 0;
    document.getElementById('pola-instability').selectedIndex = 0;
    document.getElementById('pola-parainvolvement').selectedIndex = 0;
    calcularPola();
    document.getElementById('nurick-grado').selectedIndex = 0;
    mostrarNurick();
}

// Esta función ahora se asegura de que solo una calculadora sea visible a la vez
function mostrarCalculadora(id) {
    const todasLasCalculadoras = document.querySelectorAll('main section');
    todasLasCalculadoras.forEach(calculadora => {
        calculadora.classList.add('hidden');
    });
    const calculadoraSeleccionada = document.getElementById(id);
    if (calculadoraSeleccionada) {
        calculadoraSeleccionada.classList.remove('hidden');
    }
}

// Esta función es vital para leer el parámetro de la URL
function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// El código que se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    // Lee el parámetro 'show' de la URL. Si no existe, usa 'sins-calculator' por defecto.
    const calculadoraAMostrar = getURLParameter('show') || 'sins-calculator';
    mostrarCalculadora(calculadoraAMostrar);
    
    // Inicializa todas las calculadoras para que muestren el valor predeterminado
    calcularSINS();
    mostrarFrankel();
    calcularJOA();
    calcularPola();
    mostrarNurick();

    // Configura los botones de navegación para que funcionen dentro de la misma página
    const navButtons = document.querySelectorAll('.nav-buttons button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            mostrarCalculadora(targetId);
        });
    });
});