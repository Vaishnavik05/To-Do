const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    // Allow optional TLS relaxation for quick diagnostics when set in env (NOT for production)
    if (process.env.TLS_ALLOW_INVALID_CERTS === 'true') {
      mongooseOptions.tls = true;
      mongooseOptions.tlsAllowInvalidCertificates = true;
      mongooseOptions.tlsAllowInvalidHostnames = true;
      console.warn('WARNING: TLS certificate validation is disabled (TLS_ALLOW_INVALID_CERTS=true)');
    }

    await mongoose.connect(mongoUri, mongooseOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log full error for diagnosis
    console.error('MongoDB connection failed:', error);

    // If the error looks like an SSL/TLS certificate validation issue and we haven't retried yet,
    // provide a hint to try a diagnostic retry by setting TLS_ALLOW_INVALID_CERTS=true in `.env`.
    if (/SSL|tls|certificate|alert/.test(String(error).toLowerCase())) {
      console.error('It looks like a TLS/SSL error. For diagnosis only, you can set TLS_ALLOW_INVALID_CERTS=true in server/.env and restart to see if connection succeeds.');
    }

    process.exit(1);
  }
};

connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
