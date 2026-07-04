/* =====================================================
   BIBLIOTECA VIRTUAL - Datos
   Archivo: js/datos.js
   Exportado: 26/05/2026 22:01

   INSTRUCCIONES:
   1. Descarga este archivo
   2. Sube al hosting en la carpeta js/
   3. Reemplaza el datos.js anterior
   4. Todos los visitantes verán los cambios
   ===================================================== */

/* Versión — cambia automáticamente en cada exportación */
var DATA_VERSION = "20260526220148";

/* ===== CONFIGURACIÓN DEL SITIO ===== */
var CONFIG_DEFAULT = {
    "nombre": "Biblioteca Virtual",
    "eslogan": "Tu espacio de lectura digital",
    "logo": "https://descargameyape.com/wp-content/uploads/2026/01/Logo_CEMI_78_2024-1.png"
};

/* ===== LIBROS ===== */
var LIBROS_DEFAULT = [
    {
        "id": 1,
        "nombre": "El Gran Gatsby",
        "autor": "F. Scott Fitzgerald",
        "anio": 1925,
        "categoria": "Clásico",
        "descripcion": "Una novela que retrata el sueño americano en los años veinte, llena de opulencia, amor y decepción.",
        "portada": "https://m.media-amazon.com/images/I/61OVAqqS7ZL._SL1000_.jpg",
        "pdf": "gatsby.pdf"
    },
    {
        "id": 2,
        "nombre": "1984",
        "autor": "George Orwell",
        "anio": 1949,
        "categoria": "Distopía",
        "descripcion": "Una novela distópica sobre un estado totalitario donde el gobierno vigila y controla cada aspecto de la vida.",
        "portada": "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/l/i/libro-1984-george-orwell-109980-default-1.jpg",
        "pdf": "1984.pdf"
    },
    {
        "id": 3,
        "nombre": "Cien Años de Soledad",
        "autor": "Gabriel García Márquez",
        "anio": 1967,
        "categoria": "Realismo Mágico",
        "descripcion": "La saga de la familia Buendía en el pueblo mágico de Macondo, obra cumbre del realismo mágico latinoamericano.",
        "portada": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_M6efFsBrMfXyqdojSo9BkRrceIKBDv7dOQ&s",
        "pdf": "soledad.pdf"
    },
    {
        "id": 4,
        "nombre": "Don Quijote de la Mancha",
        "autor": "Miguel de Cervantes",
        "anio": 1605,
        "categoria": "Aventura",
        "descripcion": "Las aventuras de Alonso Quijano, quien enloquece leyendo libros de caballería y sale a vivir sus propias aventuras.",
        "portada": "https://descargameyape.com/wp-content/uploads/2025/12/Don-quijote-de-la-chancha.jpg",
        "pdf": "https://descargameyape.com/wp-content/uploads/2025/12/Don_Quijote_de_la_Mancha-Cervantes_Miguel-1.pdf"
    },
    {
        "id": 5,
        "nombre": "Orgullo y Prejuicio",
        "autor": "Jane Austen",
        "anio": 1813,
        "categoria": "Romance",
        "descripcion": "La historia de Elizabeth Bennet y el señor Darcy, sobre el amor, los prejuicios y la sociedad inglesa.",
        "portada": "https://m.media-amazon.com/images/I/71HqC9TzbWL._SL1000_.jpg",
        "pdf": "orgullo.pdf"
    },
    {
        "id": 6,
        "nombre": "El Principito",
        "autor": "Antoine de Saint-Exupéry",
        "anio": 1943,
        "categoria": "Infantil",
        "descripcion": "Un pequeño príncipe viaja por el universo descubriendo la esencia de las cosas a través de los ojos de un niño.",
        "portada": "https://m.media-amazon.com/images/I/71AVK5VIAzL._SL1000_.jpg",
        "pdf": "principito.pdf"
    },
    {
        "id": 7,
        "nombre": "Harry Potter y la Piedra Filosofal",
        "autor": "J.K. Rowling",
        "anio": 1997,
        "categoria": "Fantasía",
        "descripcion": "Un joven huérfano descubre que es mago y comienza su formación en el Colegio Hogwarts de Magia y Hechicería.",
        "portada": "https://m.media-amazon.com/images/I/81C6QScDA2L._SL1000_.jpg",
        "pdf": "harry.pdf"
    }
];

/* ===== CALIFICACIONES ===== */
var CALIFICACIONES_DEFAULT = {
    "1": 4,
    "2": 4,
    "3": 5,
    "4": 5,
    "5": 5,
    "6": 4,
    "7": 5
};

/* ===== AUDIOS ===== */
var AUDIOS_DEFAULT = [];

/* ===== VIDEOS ===== */
var VIDEOS_DEFAULT = [];