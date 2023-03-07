//use to connect databse
import mongoose from 'mongoose';
//use get configuration
import { config } from '@root/config';
//replace console.log import
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL)
      .then(() => {
        log.info('successfully connected to data base');
      })
      .catch((error) => {
        log.error('Error connecting to database', error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
