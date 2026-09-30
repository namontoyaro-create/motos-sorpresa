const boton =
    document.getElementById("descubrir");

const inicio =
    document.getElementById("inicio");

const escena =
    document.getElementById("escena");

const contenedorMotos =
    document.getElementById("contenedor-motos");

const contenedorPalabras =
    document.getElementById("contenedor-palabras");


/* =========================
   IMÁGENES
========================= */

const imagenesMotos = [

    "hotwel.jpg",
    "moto1.jpg",
    "moto2.jpg",
    "moto3.jpg",
    "moto4.png",
    "moto5.png"

];


/* =========================
   FRASES
========================= */

const frases = [

    "Mi motor ❤️",

    "Mi copiloto 🏍️",

    "Mi rey 👑",

    "Mi vida ❤️",

    "Piloto favorito 🏍️",

    "Mi amor ❤️",

    "Mi campeón 🏆",

    "Mi favorito ❤️",

    "Cariño y feliz día Hot Wheels ❤️"

];


let motos = [];
let palabras = [];

let anguloMotos = 0;
let anguloPalabras = 0;


/* =========================
   BOTÓN
========================= */

boton.addEventListener("click", function () {

    inicio.style.transition = "0.8s";

    inicio.style.opacity = "0";


    setTimeout(function () {

        inicio.style.display = "none";

        escena.style.display = "block";


        crearMotos();

        crearPalabras();


        requestAnimationFrame(animar);


    }, 800);

});


/* =========================
   CREAR MOTOS
========================= */

function crearMotos() {

    contenedorMotos.innerHTML = "";

    motos = [];


    imagenesMotos.forEach(function (nombre) {

        const imagen =
            document.createElement("img");


        imagen.src =
            "img/" + nombre;


        imagen.className =
            "moto-orbita";


        escena.appendChild(imagen);


        motos.push(imagen);

    });

}


/* =========================
   CREAR PALABRAS
========================= */

function crearPalabras() {

    contenedorPalabras.innerHTML = "";

    palabras = [];


    frases.forEach(function (frase) {

        const texto =
            document.createElement("div");


        texto.className =
            "palabra-orbita";


        texto.textContent =
            frase;


        escena.appendChild(texto);


        palabras.push(texto);

    });

}


/* =========================
   ANIMACIÓN
========================= */

function animar() {

    const centroX =
        window.innerWidth / 2;

    const centroY =
        window.innerHeight / 2;


    /*
    =========================
    RADIO DE LAS MOTOS
    =========================
    */

    let radioMotoX = 270;
    let radioMotoY = 180;


    /*
    =========================
    RADIO DE LAS PALABRAS
    =========================
    */

    let radioTextoX = 430;
    let radioTextoY = 270;


    /*
    Ajuste para celular
    */

    if (window.innerWidth < 700) {

        radioMotoX = 135;
        radioMotoY = 105;

        radioTextoX = 190;
        radioTextoY = 160;

    }


    /* =========================
       GIRAR MOTOS
    ========================= */

    motos.forEach(function (moto, i) {

        const separacion =
            (Math.PI * 2 / motos.length) * i;


        const angulo =
            anguloMotos + separacion;


        const x =
            centroX +
            Math.cos(angulo) * radioMotoX;


        const y =
            centroY +
            Math.sin(angulo) * radioMotoY;


        moto.style.left =
            x + "px";


        moto.style.top =
            y + "px";

    });


    /* =========================
       GIRAR PALABRAS
       SENTIDO CONTRARIO
    ========================= */

    palabras.forEach(function (texto, i) {

        const separacion =
            (Math.PI * 2 / palabras.length) * i;


        const angulo =
            anguloPalabras + separacion;


        const x =
            centroX +
            Math.cos(angulo) * radioTextoX;


        const y =
            centroY +
            Math.sin(angulo) * radioTextoY;


        texto.style.left =
            x + "px";


        texto.style.top =
            y + "px";

    });


    /*
    VELOCIDADES
    */

    anguloMotos += 0.007;

    anguloPalabras -= 0.004;


    requestAnimationFrame(animar);

}