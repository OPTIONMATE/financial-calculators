const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 API Base URL: http://localhost:${port}/api`);
      console.log('\n📍 Available Calculators:');
      console.log('   - SIP (Systematic Investment Plan)');
      console.log('   - Lumpsum');
      console.log('   - SWP (Systematic Withdrawal Plan)');
      console.log('   - MF Returns (Mutual Fund)');
      console.log('   - SSY (Sukanya Samriddhi Yojana)');
      console.log('   - PPF (Public Provident Fund)');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();
