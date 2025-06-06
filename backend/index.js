const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// =========================
// Personalización para La Sentadita
// =========================
// Permitir CORS solo desde el frontend de Netlify
const allowedOrigins = [
  'https://lasentadita.netlify.app',
  'http://localhost:8888', // Netlify dev
  'http://localhost:3000', // local dev
];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman) o desde orígenes permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', date: new Date() });
});

// Import routes
const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
const reservationRoutes = require('./routes/reservation');
const eventRoutes = require('./routes/event');

app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
