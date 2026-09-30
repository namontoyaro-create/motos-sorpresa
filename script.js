document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTOS
    ========================================= */

    const boton = document.getElementById("descubrir");
    const inicio = document.getElementById("inicio");
    const galaxia = document.getElementById("galaxia");
    const universo = document.getElementById("universo");
    const estrellas = document.getElementById("estrellas");
    const corazones = document.getElementById("corazones");
    const musica = document.getElementById("musica");
    const estadoMusica = document.getElementById("estado-musica");

    const valorAleatorio = new Uint32Array(1);

    function aleatorio() {
        globalThis.crypto.getRandomValues(valorAleatorio);
        return valorAleatorio[0] / 4294967296;
    }

    function mostrarErrorMusica(error) {
        console.error("Error reproduciendo música:", error);
        musica.controls = true;
        estadoMusica.hidden = false;
        if (error && error.name === "NotAllowedError") {
            estadoMusica.textContent = "Pulsa reproducir en el control de música para activar el sonido.";
            return;
        }
        const fallo = musica.error;
        const mensajes = {
            1: "Se interrumpió la carga de la música.",
            2: "Falló la conexión al cargar la música.",
            3: "El navegador no pudo decodificar el archivo de música.",
            4: "El archivo de música no está disponible o el navegador no admite su formato."
        };
        estadoMusica.textContent = (fallo && mensajes[fallo.code]) || "No se pudo reproducir la música.";
        if (fallo) {
            estadoMusica.textContent += " Código: " + fallo.code + ". " + (fallo.message || "");
        }
        const enlace = document.createElement("a");
        enlace.href = musica.currentSrc || musica.src;
        enlace.textContent = " Abrir audio";
        enlace.style.color = "#00ffff";
        enlace.target = "_blank";
        enlace.rel = "noopener";
        estadoMusica.appendChild(enlace);
    }

    function posicionarMusica() {
        musica.currentTime = musica.duration > 36 ? 36 : 0;
    }


    /* =========================================
       IMÁGENES
    ========================================= */

    const imagenes = [
        "hotwel.jpg",
        "moto1.jpg",
        "moto2.jpg",
        "moto3.jpg",
        "moto4.png",
        "moto5.png"
    ];


    /* =========================================
       FRASES
    ========================================= */

    const textos = [
        "Mi motor ❤️",
        "Mi copiloto 🏍️",
        "Mi rey 👑",
        "Mi vida ❤️",
        "Piloto favorito 🏍️",
        "Mi amor ❤️",
        "Mi campeón 🏆",
        "Mi favorito ❤️",
        "Cariño ❤️"
    ];


    let motos = [];
    let frases = [];
    let tiempo = 0;
    let animacionIniciada = false;


    /* =========================================
       COMPROBAR ELEMENTOS
    ========================================= */

    if (!boton) {
        console.error("No se encontró el botón DESCUBRIR.");
        return;
    }

    if (!musica) {
        console.error("No se encontró el elemento de audio.");
    }


    /* =========================================
       CREAR ESTRELLAS
    ========================================= */

    function crearEstrellas() {

        estrellas.innerHTML = "";

        for (let i = 0; i < 130; i++) {

            const estrella = document.createElement("div");

            estrella.className = "estrella";

            estrella.style.left =
                aleatorio() * 100 + "%";

            estrella.style.top =
                aleatorio() * 100 + "%";

            const tamaño =
                aleatorio() * 3 + 1;

            estrella.style.width =
                tamaño + "px";

            estrella.style.height =
                tamaño + "px";

            estrella.style.animationDelay =
                aleatorio() * 3 + "s";

            estrella.style.animationDuration =
                (aleatorio() * 2 + 1.5) + "s";

            estrellas.appendChild(estrella);
        }
    }


    /* =========================================
       CREAR CORAZONES
    ========================================= */

    function crearCorazones() {

        corazones.innerHTML = "";

        for (let i = 0; i < 22; i++) {

            const corazon =
                document.createElement("div");

            corazon.className =
                "corazon-flotante";

            corazon.textContent =
                "❤";

            corazon.style.left =
                aleatorio() * 100 + "%";

            corazon.style.top =
                (aleatorio() * 100 + 70) + "%";

            corazon.style.fontSize =
                (aleatorio() * 17 + 10) + "px";

            corazon.style.animationDuration =
                (aleatorio() * 10 + 8) + "s";

            corazon.style.animationDelay =
                -(aleatorio() * 15) + "s";

            corazones.appendChild(corazon);
        }
    }


    /* =========================================
       CREAR MOTOS
    ========================================= */

    function crearMotos() {

        motos = [];

        imagenes.forEach(function (nombre, i) {

            const img =
                document.createElement("img");

            img.src =
                "./img/" + nombre;

            img.className =
                "objeto-moto";

            img.dataset.angulo =
                (Math.PI * 2 / imagenes.length) * i;

            img.dataset.altura =
                Math.sin(i * 1.7) * 70;

            universo.appendChild(img);

            motos.push(img);
        });
    }


    /* =========================================
       CREAR FRASES
    ========================================= */

    function crearFrases() {

        frases = [];

        textos.forEach(function (texto, i) {

            const frase =
                document.createElement("div");

            frase.className =
                "frase";

            frase.textContent =
                texto;

            frase.dataset.angulo =
                (Math.PI * 2 / textos.length) * i;

            frase.dataset.altura =
                Math.cos(i * 1.5) * 90;

            universo.appendChild(frase);

            frases.push(frase);
        });
    }


    /* =========================================
       REPRODUCIR MÚSICA DESDE 0:36
    ========================================= */

    function reproducirMusica() {

        if (!musica) {
            return;
        }

        musica.volume = 0.8;


        /* Si ya cargó la duración */
        if (musica.readyState >= 1) {

            posicionarMusica();

        } else {

            musica.addEventListener(
                "loadedmetadata",
                function () {

                    posicionarMusica();

                },
                { once: true }
            );
        }


        /* IMPORTANTE:
           play() se ejecuta directamente
           después del clic del usuario.
        */

        musica.play()
            .then(function () {

                console.log(
                    "✅ Música reproduciendo"
                );

            })
            .catch(function (error) {

                mostrarErrorMusica(error);

                console.error(
                    "❌ Error reproduciendo música:",
                    error
                );

            });
    }


    /* =========================================
       BOTÓN DESCUBRIR
    ========================================= */

    boton.addEventListener("click", function () {

        console.log(
            "✅ DESCUBRIR presionado"
        );


        /* Evitar doble clic */

        boton.disabled = true;


        /* MÚSICA */

        reproducirMusica();


        /* DESAPARECER INICIO */

        inicio.style.transition =
            "opacity 0.8s";

        inicio.style.opacity =
            "0";


        setTimeout(function () {

            inicio.style.display =
                "none";

            galaxia.style.display =
                "block";


            /* Limpiar */

            universo.innerHTML =
                "";


            /* Crear efectos */

            crearEstrellas();

            crearCorazones();

            crearMotos();

            crearFrases();


            /* Iniciar animación */

            if (!animacionIniciada) {

                animacionIniciada = true;

                requestAnimationFrame(animar);
            }

        }, 800);
    });


    /* =========================================
       CUANDO TERMINE LA CANCIÓN
       VOLVER A 0:36
    ========================================= */

    if (musica) {

        musica.addEventListener("error", function () {
            mostrarErrorMusica(musica.error);
        });
        musica.addEventListener("playing", function () {
            estadoMusica.hidden = true;
        });

        musica.addEventListener(
            "ended",
            function () {

                posicionarMusica();

                musica.play()
                    .catch(function (error) {

                        mostrarErrorMusica(error);

                        console.log(
                            "No se pudo repetir:",
                            error
                        );

                    });
            }
        );
    }


    /* =========================================
       ANIMACIÓN
    ========================================= */

    function animar() {

        tiempo += 0.006;


        const movil =
            window.innerWidth < 700;


        /* =====================================
           TAMAÑO DE ÓRBITA DE MOTOS
        ===================================== */

        const radioMotoX =
            movil ? 145 : 340;

        const radioMotoY =
            movil ? 105 : 195;


        /* =====================================
           TAMAÑO DE ÓRBITA DE FRASES
        ===================================== */

        const radioTextoX =
            movil ? 195 : 480;

        const radioTextoY =
            movil ? 150 : 285;


        /* =====================================
           GIRAR MOTOS
        ===================================== */

        motos.forEach(function (moto) {

            const base =
                Number(
                    moto.dataset.angulo
                );

            const angulo =
                base + tiempo;


            const x =
                Math.cos(angulo) *
                radioMotoX;


            const y =
                Math.sin(angulo) *
                radioMotoY
                +
                Number(
                    moto.dataset.altura
                ) * 0.22;


            const profundidad =
                Math.sin(angulo);


            const escala =
                0.62
                +
                ((profundidad + 1) / 2)
                * 0.75;


            const z =
                profundidad * 280;


            moto.style.transform = `
                translate(-50%, -50%)
                translate3d(
                    ${x}px,
                    ${y}px,
                    ${z}px
                )
                scale(${escala})
            `;


            moto.style.opacity =
                0.45
                +
                ((profundidad + 1) / 2)
                * 0.55;


            if (profundidad > 0) {

                moto.style.zIndex =
                    "260";

            } else {

                moto.style.zIndex =
                    "20";

            }

        });


        /* =====================================
           GIRAR FRASES
        ===================================== */

        frases.forEach(function (frase) {

            const base =
                Number(
                    frase.dataset.angulo
                );


            /*
            Las frases giran
            en sentido contrario
            */

            const angulo =
                base - tiempo * 1.05;


            const x =
                Math.cos(angulo) *
                radioTextoX;


            const y =
                Math.sin(angulo) *
                radioTextoY
                +
                Number(
                    frase.dataset.altura
                ) * 0.18;


            const profundidad =
                Math.sin(angulo);


            const escala =
                0.72
                +
                ((profundidad + 1) / 2)
                * 0.40;


            frase.style.transform = `
                translate(-50%, -50%)
                translate3d(
                    ${x}px,
                    ${y}px,
                    ${profundidad * 170}px
                )
                scale(${escala})
            `;


            frase.style.opacity =
                0.48
                +
                ((profundidad + 1) / 2)
                * 0.52;


            if (profundidad > 0) {

                frase.style.zIndex =
                    "270";

            } else {

                frase.style.zIndex =
                    "15";

            }

        });


        requestAnimationFrame(animar);
    }

});
