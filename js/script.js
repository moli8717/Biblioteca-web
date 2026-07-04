/* =====================================================
   BIBLIOTECA VIRTUAL MIFA 78 PUCARÁ - Lógica
   Archivo: js/script.js

   NOTA PARA LOS COMPAÑEROS: Este archivo contiene solo las funciones.
   Los datos (libros, config, etc.) están en js/datos.js
   ===================================================== */

/* ===========================
   CLAVES DE LOCALSTORAGE
=========================== */
var KEY_VERSION        = "bv_version";
var KEY_LIBROS         = "bv_libros";
var KEY_CONFIG         = "bv_config";
var KEY_AUDIOS         = "bv_audios";
var KEY_VIDEOS         = "bv_videos";
var KEY_CALIFICACIONES = "bv_calificaciones";

/* ===========================
   VARIABLES GLOBALES
=========================== */
var libros         = [];
var config         = {};
var audios         = [];
var videos         = [];
var calificaciones = {};

/* ===========================
   INICIALIZAR STORAGE
   Se llama cuando la versión
   de datos.js cambia
=========================== */
function inicializarStorage() {
    localStorage.setItem(KEY_VERSION,        DATA_VERSION);
    localStorage.setItem(KEY_LIBROS,         JSON.stringify(LIBROS_DEFAULT));
    localStorage.setItem(KEY_CONFIG,         JSON.stringify(CONFIG_DEFAULT));
    localStorage.setItem(KEY_AUDIOS,         JSON.stringify(AUDIOS_DEFAULT));
    localStorage.setItem(KEY_VIDEOS,         JSON.stringify(VIDEOS_DEFAULT));
    localStorage.setItem(KEY_CALIFICACIONES, JSON.stringify(CALIFICACIONES_DEFAULT));
}

/* ===========================
   CARGAR DATOS
   Si la versión del datos.js
   cambió, reinicia desde código
=========================== */
function cargarTodosLosDatos() {
    var versionGuardada = localStorage.getItem(KEY_VERSION);

    /* Si la versión cambió o no existe: reiniciar desde datos.js */
    if (versionGuardada !== DATA_VERSION) {
        inicializarStorage();
    }

    /* Cargar cada dato desde localStorage */
    libros         = JSON.parse(localStorage.getItem(KEY_LIBROS))         || LIBROS_DEFAULT;
    config         = JSON.parse(localStorage.getItem(KEY_CONFIG))         || CONFIG_DEFAULT;
    audios         = JSON.parse(localStorage.getItem(KEY_AUDIOS))         || AUDIOS_DEFAULT;
    videos         = JSON.parse(localStorage.getItem(KEY_VIDEOS))         || VIDEOS_DEFAULT;
    calificaciones = JSON.parse(localStorage.getItem(KEY_CALIFICACIONES)) || CALIFICACIONES_DEFAULT;
}

/* ===========================
   APLICAR CONFIGURACIÓN
   del sitio en el HTML
=========================== */
function aplicarConfiguracion() {
    if (config.nombre) {
        document.getElementById("nombre-biblioteca").textContent  = config.nombre;
        document.getElementById("titulo-bienvenida").textContent  = "Bienvenido a " + config.nombre;
        document.getElementById("footer-nombre").textContent      = config.nombre;
        document.getElementById("footer-copy").textContent        = config.nombre;
        document.title = config.nombre;
    }

    if (config.eslogan) {
        document.getElementById("eslogan-biblioteca").textContent = config.eslogan;
    }

    /* Logo */
    if (config.logo && config.logo.trim() !== "") {
        document.getElementById("logo-imagen").src                       = config.logo;
        document.getElementById("logo-imagen-contenedor").style.display  = "block";
        document.getElementById("logo-icono-default").style.display      = "none";
    } else {
        document.getElementById("logo-imagen-contenedor").style.display  = "none";
        document.getElementById("logo-icono-default").style.display      = "inline";
    }
}

/* ===========================
   MOSTRAR ESTRELLAS
=========================== */
function mostrarEstrellas(id) {
    var puntos = calificaciones[id] || 0;
    if (puntos === 0) {
        return '<span style="color:#bbb; font-size:12px;">Sin calificación</span>';
    }
    var estrellas = "";
    for (var i = 1; i <= 5; i++) {
        estrellas += (i <= puntos) ? "⭐" : "☆";
    }
    return estrellas;
}

/* ===========================
   RENDERIZAR LIBROS
=========================== */
function renderizarLibros(lista) {
    var contenedor = document.getElementById("contenedor-libros");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">😔 No se encontraron libros con ese criterio.</p>';
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        var libro = lista[i];

        var descHTML = "";
        if (libro.descripcion && libro.descripcion.trim() !== "") {
            descHTML = '<p class="tarjeta-descripcion">' + libro.descripcion + '</p>';
        }

        var tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-libro";
        tarjeta.innerHTML =
            '<img src="' + libro.portada + '" ' +
                'alt="Portada de ' + libro.nombre + '" ' +
                'class="tarjeta-portada" ' +
                'onerror="this.src=\'https://via.placeholder.com/240x280?text=Sin+Portada\'">' +
            '<div class="tarjeta-info">' +
                '<h3 class="tarjeta-titulo">' + libro.nombre + '</h3>' +
                '<p class="tarjeta-autor">✍️ ' + libro.autor + '</p>' +
                '<p class="tarjeta-anio">📅 Año: ' + libro.anio + '</p>' +
                descHTML +
                '<span class="tarjeta-categoria">' + libro.categoria + '</span>' +
                '<p class="tarjeta-rating">' + mostrarEstrellas(libro.id) + '</p>' +
            '</div>' +
            '<div class="tarjeta-acciones">' +
                '<button class="btn-ver" onclick="visualizarPdf(\'' + libro.pdf + '\',\'' + libro.nombre.replace(/'/g, "\\'") + '\')">' +
                    '👁️ Ver</button>' +
                '<a href="' + libro.pdf + '" download="' + libro.nombre + '.pdf" class="btn-descargar">' +
                    '⬇️ Descargar</a>' +
            '</div>';

        contenedor.appendChild(tarjeta);
    }
}

/* ===========================
   BUSCAR LIBROS
=========================== */
function buscarLibros() {
    var texto      = document.getElementById("buscador").value.toLowerCase();
    var resultados = [];

    for (var i = 0; i < libros.length; i++) {
        var l = libros[i];
        var coincide =
            l.nombre.toLowerCase().indexOf(texto)    !== -1 ||
            l.autor.toLowerCase().indexOf(texto)     !== -1 ||
            l.anio.toString().indexOf(texto)         !== -1 ||
            l.categoria.toLowerCase().indexOf(texto) !== -1 ||
            (l.descripcion && l.descripcion.toLowerCase().indexOf(texto) !== -1);

        if (coincide) { resultados.push(l); }
    }

    renderizarLibros(resultados);
}

/* ===========================
   VISOR PDF
=========================== */
function visualizarPdf(url, nombre) {
    document.getElementById("iframe-pdf").src            = url;
    document.getElementById("visor-titulo").textContent  = "📖 " + nombre;
    var visor = document.getElementById("visor");
    visor.style.display = "flex";
    visor.classList.add("activo");
}

function cerrarVisor() {
    var visor = document.getElementById("visor");
    visor.style.display = "none";
    visor.classList.remove("activo");
    document.getElementById("iframe-pdf").src = "";
}

/* ===========================
   TABLA ESTADÍSTICAS
=========================== */
function cargarTablaEstadisticas() {
    var cuerpo     = document.getElementById("tabla-cuerpo");
    var categorias = {};
    cuerpo.innerHTML = "";

    for (var i = 0; i < libros.length; i++) {
        var libro = libros[i];
        var cat   = libro.categoria;
        if (!categorias[cat]) {
            categorias[cat] = { cantidad: 0, anioMin: libro.anio, anioMax: libro.anio };
        }
        categorias[cat].cantidad++;
        if (libro.anio < categorias[cat].anioMin) { categorias[cat].anioMin = libro.anio; }
        if (libro.anio > categorias[cat].anioMax) { categorias[cat].anioMax = libro.anio; }
    }

    for (var nombre in categorias) {
        var datos = categorias[nombre];
        var fila  = document.createElement("tr");
        fila.innerHTML =
            '<td>' + nombre          + '</td>' +
            '<td>' + datos.cantidad  + ' libro(s)</td>' +
            '<td>' + datos.anioMin   + '</td>' +
            '<td>' + datos.anioMax   + '</td>';
        cuerpo.appendChild(fila);
    }
}

/* ===========================
   CATEGORÍAS EN FOOTER
=========================== */
function actualizarFooterCategorias() {
    var lista      = document.getElementById("footer-categorias");
    var categorias = {};
    lista.innerHTML = "";

    for (var i = 0; i < libros.length; i++) {
        categorias[libros[i].categoria] = true;
    }

    for (var cat in categorias) {
        var li = document.createElement("li");
        li.textContent = cat;
        lista.appendChild(li);
    }
}

/* ===========================
   RENDERIZAR MULTIMEDIA
=========================== */
function renderizarMultimedia() {
    /* --- AUDIOS --- */
    var seccionAudios = document.getElementById("seccion-audios");
    var listaAudios   = document.getElementById("lista-audios");
    listaAudios.innerHTML = "";

    if (audios.length > 0) {
        seccionAudios.style.display = "block";
        for (var i = 0; i < audios.length; i++) {
            var a      = audios[i];
            var tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-audio";
            tarjeta.innerHTML =
                '<h4>🎵 ' + a.titulo + '</h4>' +
                '<audio controls>' +
                    '<source src="' + a.url + '">' +
                    'Tu navegador no soporta audio.' +
                '</audio>';
            listaAudios.appendChild(tarjeta);
        }
    } else {
        seccionAudios.style.display = "none";
    }

    /* --- VIDEOS --- */
    var seccionVideos = document.getElementById("seccion-videos");
    var listaVideos   = document.getElementById("lista-videos");
    listaVideos.innerHTML = "";

    if (videos.length > 0) {
        seccionVideos.style.display = "block";
        for (var j = 0; j < videos.length; j++) {
            var v       = videos[j];
            var tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-video";

            var esYoutube = v.url.indexOf("youtube.com/embed") !== -1;
            var contenidoVideo = esYoutube
                ? '<div class="video-iframe-contenedor"><iframe src="' + v.url + '" allowfullscreen></iframe></div>'
                : '<video controls><source src="' + v.url + '">Tu navegador no soporta video.</video>';

            tarjeta.innerHTML = '<h4>🎬 ' + v.titulo + '</h4>' + contenidoVideo;
            listaVideos.appendChild(tarjeta);
        }
    } else {
        seccionVideos.style.display = "none";
    }
}

/* ===========================
   FORMULARIO CONTACTO
=========================== */
function configurarFormulario() {
    var form = document.getElementById("formulario-contacto");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("mensaje-exito").style.display = "block";
        form.reset();
        setTimeout(function() {
            document.getElementById("mensaje-exito").style.display = "none";
        }, 4000);
    });
}

/* ===========================
   NAVEGACIÓN ACTIVA
=========================== */
function configurarNavegacion() {
    window.addEventListener("scroll", function() {
        var secciones     = ["bienvenida", "libros", "multimedia", "estadisticas", "contacto"];
        var seccionActual = "";

        for (var i = 0; i < secciones.length; i++) {
            var s = document.getElementById(secciones[i]);
            if (s && s.getBoundingClientRect().top <= 120) {
                seccionActual = secciones[i];
            }
        }

        var enlaces = document.querySelectorAll(".menu-enlace");
        for (var j = 0; j < enlaces.length; j++) {
            enlaces[j].classList.remove("activo");
            if (enlaces[j].getAttribute("href") === "#" + seccionActual) {
                enlaces[j].classList.add("activo");
            }
        }
    });
}

/* ===========================
   ========= ADMIN ==========
=========================== */
var PASSWORD_ADMIN = "MIFA78pucara";

function abrirAdmin() {
    document.getElementById("modal-admin").style.display    = "flex";
    document.getElementById("login-admin").style.display    = "block";
    document.getElementById("panel-admin").style.display    = "none";
    document.getElementById("input-password").value         = "";
    document.getElementById("error-password").style.display = "none";
}

function cerrarAdmin() {
    document.getElementById("modal-admin").style.display = "none";
}

function verificarPassword() {
    if (document.getElementById("input-password").value === PASSWORD_ADMIN) {
        document.getElementById("login-admin").style.display = "none";
        document.getElementById("panel-admin").style.display = "block";
        cambiarTab("libros");
    } else {
        document.getElementById("error-password").style.display = "block";
    }
}

/* ===========================
   PESTAÑAS DEL ADMIN
=========================== */
function cambiarTab(nombre) {
    var tabs = document.querySelectorAll(".tab-contenido");
    for (var i = 0; i < tabs.length; i++) { tabs[i].style.display = "none"; }

    var btns = document.querySelectorAll(".tab-btn");
    for (var j = 0; j < btns.length; j++) { btns[j].classList.remove("activo"); }

    document.getElementById("tab-" + nombre).style.display = "block";

    var btnActivo = document.querySelector('[onclick="cambiarTab(\'' + nombre + '\')"]');
    if (btnActivo) { btnActivo.classList.add("activo"); }

    if (nombre === "libros")         { cargarTablaLibros(); }
    if (nombre === "calificaciones") { cargarTablaCalificaciones(); }
    if (nombre === "multimedia")     { cargarMultimediaAdmin(); }
    if (nombre === "configuracion")  { cargarFormConfig(); }
}

/* ===========================
   CRUD LIBROS (ADMIN)
=========================== */
function cargarTablaLibros() {
    var cuerpo = document.getElementById("tabla-libros-cuerpo");
    cuerpo.innerHTML = "";
    cancelarFormLibro();

    for (var i = 0; i < libros.length; i++) {
        var libro = libros[i];
        var fila  = document.createElement("tr");
        fila.innerHTML =
            '<td><img src="' + libro.portada + '" class="mini-portada" ' +
                'onerror="this.src=\'https://via.placeholder.com/45x60?text=?\'" ></td>' +
            '<td>' + libro.nombre    + '</td>' +
            '<td>' + libro.autor     + '</td>' +
            '<td>' + libro.anio      + '</td>' +
            '<td>' + libro.categoria + '</td>' +
            '<td>' +
                '<button class="btn-editar"   onclick="mostrarFormLibro(' + libro.id + ')">✏️ Editar</button>' +
                '<button class="btn-eliminar" onclick="eliminarLibro('   + libro.id + ')">🗑️ Eliminar</button>' +
            '</td>';
        cuerpo.appendChild(fila);
    }
}

function mostrarFormLibro(id) {
    document.getElementById("form-libro-contenedor").style.display = "block";
    document.getElementById("error-libro").style.display           = "none";

    if (id === null) {
        /* Nuevo libro */
        document.getElementById("form-libro-titulo").textContent = "➕ Nuevo Libro";
        document.getElementById("libro-id").value          = "";
        document.getElementById("libro-nombre").value      = "";
        document.getElementById("libro-autor").value       = "";
        document.getElementById("libro-anio").value        = "";
        document.getElementById("libro-categoria").value   = "";
        document.getElementById("libro-descripcion").value = "";
        document.getElementById("libro-portada").value     = "";
        document.getElementById("libro-pdf").value         = "";
    } else {
        /* Editar libro existente */
        var libro = buscarLibroPorId(id);
        if (!libro) { return; }

        document.getElementById("form-libro-titulo").textContent = "✏️ Editar Libro";
        document.getElementById("libro-id").value          = libro.id;
        document.getElementById("libro-nombre").value      = libro.nombre;
        document.getElementById("libro-autor").value       = libro.autor;
        document.getElementById("libro-anio").value        = libro.anio;
        document.getElementById("libro-categoria").value   = libro.categoria;
        document.getElementById("libro-descripcion").value = libro.descripcion  || "";
        document.getElementById("libro-portada").value     = libro.portada;
        document.getElementById("libro-pdf").value         = libro.pdf;
    }

    document.getElementById("form-libro-contenedor").scrollIntoView({ behavior: "smooth" });
}

function buscarLibroPorId(id) {
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].id === id) { return libros[i]; }
    }
    return null;
}

function guardarLibro() {
    var nombre    = document.getElementById("libro-nombre").value.trim();
    var autor     = document.getElementById("libro-autor").value.trim();
    var anio      = document.getElementById("libro-anio").value.trim();
    var categoria = document.getElementById("libro-categoria").value.trim();
    var desc      = document.getElementById("libro-descripcion").value.trim();
    var portada   = document.getElementById("libro-portada").value.trim();
    var pdf       = document.getElementById("libro-pdf").value.trim();
    var idExiste  = document.getElementById("libro-id").value;

    if (!nombre || !autor || !anio || !categoria || !portada || !pdf) {
        document.getElementById("error-libro").style.display = "block";
        return;
    }

    document.getElementById("error-libro").style.display = "none";

    if (idExiste === "") {
        /* Nuevo libro */
        libros.push({
            id:          Date.now(),
            nombre:      nombre,
            autor:       autor,
            anio:        parseInt(anio),
            categoria:   categoria,
            descripcion: desc,
            portada:     portada,
            pdf:         pdf
        });
        alert("✅ Libro \"" + nombre + "\" agregado.");
    } else {
        /* Editar */
        var id = parseInt(idExiste);
        for (var i = 0; i < libros.length; i++) {
            if (libros[i].id === id) {
                libros[i].nombre      = nombre;
                libros[i].autor       = autor;
                libros[i].anio        = parseInt(anio);
                libros[i].categoria   = categoria;
                libros[i].descripcion = desc;
                libros[i].portada     = portada;
                libros[i].pdf         = pdf;
                break;
            }
        }
        alert("✅ Libro \"" + nombre + "\" actualizado.");
    }

    localStorage.setItem(KEY_LIBROS, JSON.stringify(libros));
    renderizarLibros(libros);
    cargarTablaEstadisticas();
    actualizarFooterCategorias();
    cargarTablaLibros();
    cancelarFormLibro();
}

function cancelarFormLibro() {
    document.getElementById("form-libro-contenedor").style.display = "none";
}

function eliminarLibro(id) {
    var libro = buscarLibroPorId(id);
    if (!libro) { return; }
    if (!confirm("¿Eliminar \"" + libro.nombre + "\"?")) { return; }

    var nueva = [];
    for (var i = 0; i < libros.length; i++) {
        if (libros[i].id !== id) { nueva.push(libros[i]); }
    }
    libros = nueva;

    localStorage.setItem(KEY_LIBROS, JSON.stringify(libros));
    renderizarLibros(libros);
    cargarTablaEstadisticas();
    actualizarFooterCategorias();
    cargarTablaLibros();
}

/* ===========================
   CALIFICACIONES (ADMIN)
=========================== */
function cargarTablaCalificaciones() {
    var cuerpo = document.getElementById("tabla-admin-cuerpo");
    cuerpo.innerHTML = "";

    for (var i = 0; i < libros.length; i++) {
        var libro     = libros[i];
        var calActual = calificaciones[libro.id] || 0;
        var fila      = document.createElement("tr");
        fila.innerHTML =
            '<td>' + libro.nombre + '</td>' +
            '<td>' + libro.autor  + '</td>' +
            '<td>' +
                '<select id="rating-' + libro.id + '">' +
                    '<option value="0"' + (calActual==0?" selected":"") + '>-- Sin calificación --</option>' +
                    '<option value="1"' + (calActual==1?" selected":"") + '>⭐ 1 estrella</option>'          +
                    '<option value="2"' + (calActual==2?" selected":"") + '>⭐⭐ 2 estrellas</option>'       +
                    '<option value="3"' + (calActual==3?" selected":"") + '>⭐⭐⭐ 3 estrellas</option>'     +
                    '<option value="4"' + (calActual==4?" selected":"") + '>⭐⭐⭐⭐ 4 estrellas</option>'   +
                    '<option value="5"' + (calActual==5?" selected":"") + '>⭐⭐⭐⭐⭐ 5 estrellas</option>' +
                '</select>' +
            '</td>';
        cuerpo.appendChild(fila);
    }
}

function guardarCalificaciones() {
    for (var i = 0; i < libros.length; i++) {
        var id     = libros[i].id;
        var select = document.getElementById("rating-" + id);
        if (select) { calificaciones[id] = parseInt(select.value); }
    }
    localStorage.setItem(KEY_CALIFICACIONES, JSON.stringify(calificaciones));
    renderizarLibros(libros);
    alert("✅ Calificaciones guardadas.");
    cerrarAdmin();
}

/* ===========================
   MULTIMEDIA (ADMIN)
=========================== */
function cargarMultimediaAdmin() {
    cargarListaAdmin("audio", audios);
    cargarListaAdmin("video", videos);
}

function cargarListaAdmin(tipo, lista) {
    var contenedor = document.getElementById("lista-admin-" + tipo + "s");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = '<p style="color:#aaa;font-size:13px;padding:8px 0;">No hay ' + tipo + 's agregados aún.</p>';
        return;
    }

    for (var i = 0; i < lista.length; i++) {
        var item = lista[i];
        var div  = document.createElement("div");
        div.className = "item-multimedia-admin";

        /* Usamos función auto-invocada para capturar el índice correctamente */
        (function(indice, t) {
            div.innerHTML =
                '<span><strong>' + item.titulo + '</strong> — ' + item.url + '</span>' +
                '<button class="btn-eliminar" onclick="eliminarMultimedia(\'' + t + '\',' + indice + ')">🗑️</button>';
        })(i, tipo);

        contenedor.appendChild(div);
    }
}

function mostrarFormMultimedia(tipo) {
    document.getElementById("form-" + tipo).style.display = "block";
}

function ocultarFormMultimedia(tipo) {
    document.getElementById("form-" + tipo).style.display    = "none";
    document.getElementById(tipo + "-titulo").value          = "";
    document.getElementById(tipo + "-url").value             = "";
}

function agregarMultimedia(tipo) {
    var titulo = document.getElementById(tipo + "-titulo").value.trim();
    var url    = document.getElementById(tipo + "-url").value.trim();

    if (!titulo || !url) { alert("❌ Completa el título y la URL."); return; }

    var item = { titulo: titulo, url: url };

    if (tipo === "audio") {
        audios.push(item);
        localStorage.setItem(KEY_AUDIOS, JSON.stringify(audios));
        cargarListaAdmin("audio", audios);
    } else {
        videos.push(item);
        localStorage.setItem(KEY_VIDEOS, JSON.stringify(videos));
        cargarListaAdmin("video", videos);
    }

    ocultarFormMultimedia(tipo);
    renderizarMultimedia();
    alert("✅ " + (tipo === "audio" ? "Audio" : "Video") + " \"" + titulo + "\" agregado.");
}

function eliminarMultimedia(tipo, indice) {
    var lista = (tipo === "audio") ? audios : videos;
    if (!confirm("¿Eliminar \"" + lista[indice].titulo + "\"?")) { return; }

    lista.splice(indice, 1);
    localStorage.setItem(tipo === "audio" ? KEY_AUDIOS : KEY_VIDEOS, JSON.stringify(lista));
    cargarListaAdmin(tipo, lista);
    renderizarMultimedia();
}

/* ===========================
   CONFIGURACIÓN (ADMIN)
=========================== */
function cargarFormConfig() {
    document.getElementById("config-nombre").value  = config.nombre  || "";
    document.getElementById("config-eslogan").value = config.eslogan || "";
    document.getElementById("config-logo").value    = config.logo    || "";
    previewLogo();
}

function previewLogo() {
    var url  = document.getElementById("config-logo").value.trim();
    var caja = document.getElementById("preview-logo-caja");
    caja.innerHTML = url
        ? '<img src="' + url + '" alt="Vista previa" onerror="this.parentElement.innerHTML=\'<span style=color:red>❌ URL inválida</span>\'">'
        : '<span style="color:#aaa;">Sin logo configurado</span>';
}

function guardarConfiguracion() {
    config.nombre  = document.getElementById("config-nombre").value.trim()  || "Biblioteca Virtual";
    config.eslogan = document.getElementById("config-eslogan").value.trim() || "Tu espacio de lectura digital";
    config.logo    = document.getElementById("config-logo").value.trim();

    localStorage.setItem(KEY_CONFIG, JSON.stringify(config));
    aplicarConfiguracion();
    alert("✅ Configuración guardada.");
    cerrarAdmin();
}

/* ===========================
   EXPORTAR datos.js
   Genera y descarga el archivo
   con todos los datos actuales
=========================== */
function exportarDatos() {
    /* Generar versión con fecha y hora actual */
    var ahora   = new Date();
    var version = ahora.getFullYear().toString()              +
                  pad2(ahora.getMonth() + 1)                  +
                  pad2(ahora.getDate())                       +
                  pad2(ahora.getHours())                      +
                  pad2(ahora.getMinutes())                    +
                  pad2(ahora.getSeconds());

    var fechaLegible =
        pad2(ahora.getDate()) + "/" +
        pad2(ahora.getMonth() + 1) + "/" +
        ahora.getFullYear() + " " +
        pad2(ahora.getHours()) + ":" +
        pad2(ahora.getMinutes());

    /* Construir el contenido del archivo datos.js */
    var contenido =
        "/* =====================================================\n"           +
        "   BIBLIOTECA VIRTUAL - Datos\n"                                      +
        "   Archivo: js/datos.js\n"                                            +
        "   Exportado: " + fechaLegible + "\n"                                 +
        "\n"                                                                   +
        "   INSTRUCCIONES:\n"                                                  +
        "   1. Descarga este archivo\n"                                        +
        "   2. Sube al hosting en la carpeta js/\n"                            +
        "   3. Reemplaza el datos.js anterior\n"                               +
        "   4. Todos los visitantes verán los cambios\n"                       +
        "   ===================================================== */\n\n"      +

        "/* Versión — cambia automáticamente en cada exportación */\n"         +
        "var DATA_VERSION = \"" + version + "\";\n\n"                          +

        "/* ===== CONFIGURACIÓN DEL SITIO ===== */\n"                          +
        "var CONFIG_DEFAULT = " + JSON.stringify(config, null, 4) + ";\n\n"    +

        "/* ===== LIBROS ===== */\n"                                           +
        "var LIBROS_DEFAULT = " + JSON.stringify(libros, null, 4) + ";\n\n"    +

        "/* ===== CALIFICACIONES ===== */\n"                                   +
        "var CALIFICACIONES_DEFAULT = " + JSON.stringify(calificaciones, null, 4) + ";\n\n" +

        "/* ===== AUDIOS ===== */\n"                                           +
        "var AUDIOS_DEFAULT = " + JSON.stringify(audios, null, 4) + ";\n\n"    +

        "/* ===== VIDEOS ===== */\n"                                           +
        "var VIDEOS_DEFAULT = " + JSON.stringify(videos, null, 4) + ";\n";

    /* Descargar el archivo */
    descargarArchivo(contenido, "datos.js", "application/javascript");

    alert(
        "✅ datos.js exportado correctamente.\n\n" +
        "Pasos para publicar:\n" +
        "1. Sube el archivo a tu hosting en la carpeta js/\n" +
        "2. Reemplaza el datos.js anterior\n" +
        "3. ¡Listo! Los cambios serán visibles para todos."
    );
}

/* Función auxiliar: agrega cero inicial si el número es menor a 10 */
function pad2(n) {
    return n < 10 ? "0" + n : n.toString();
}

/* Función auxiliar: descarga un archivo desde el navegador */
function descargarArchivo(contenido, nombre, tipo) {
    var blob = new Blob([contenido], { type: tipo });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement("a");
    a.href     = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ===========================
   TECLA ENTER EN LOGIN
=========================== */
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("input-password").addEventListener("keypress", function(e) {
        if (e.key === "Enter") { verificarPassword(); }
    });
});

/* ===========================
   INICIALIZAR LA PÁGINA
=========================== */
document.addEventListener("DOMContentLoaded", function() {

    /* 1. Cargar todos los datos (verifica versión de datos.js) */
    cargarTodosLosDatos();

    /* 2. Aplicar configuración visual */
    aplicarConfiguracion();

    /* 3. Renderizar contenido */
    renderizarLibros(libros);
    cargarTablaEstadisticas();
    actualizarFooterCategorias();
    renderizarMultimedia();

    /* 4. Eventos */
    document.getElementById("buscador").addEventListener("input", buscarLibros);
    configurarFormulario();
    configurarNavegacion();
});
