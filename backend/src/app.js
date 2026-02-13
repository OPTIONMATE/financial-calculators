const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const { errorHandler, notFound } = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
