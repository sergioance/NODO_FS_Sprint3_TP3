import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario en ESM para tener __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(methodOverride('_method')); 

// Middleware para parsear JSON
app.use(express.json());

// Middleware para formularios HTML
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
connectDB();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// EJS como motor de vistas en Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Sirve la carpeta 'public' como estática
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
    res.redirect('/api/heroes/vista');
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
