import app from './app';
import { connectDatabase } from './config/database';
import logger from './config/logger';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDatabase();
    logger.debug('Database connected successfully.');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Graceful shutdown logic
    const shutdown = () => {
      logger.info('Shutting down server...');
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();