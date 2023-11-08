import { LOGGER } from './logging';
import { createServer } from './server';
import dotenv from 'dotenv';

(async () => {
  //read .env file
  dotenv.config();

  const { ENV, PORT } = process.env;
  if (!ENV || !PORT) {
    LOGGER.error('Missing some required env vars');
    process.exit(1);
  }

  const server = await createServer();

  server.listen(PORT, () => LOGGER.info(`Listening on port ${PORT} in ${ENV} envirnoment`));
})();
