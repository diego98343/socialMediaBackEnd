import express, { Express } from 'express';
import { chattyServer } from '@root/setupService';
import databaseConnection from '@root/setupDataBase';
import { config } from '@root/config';

//sudo npm install --save-dev tsconfig-paths    to change import paths
class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: chattyServer = new chattyServer(app);
    server.stats();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();

application.initialize();
