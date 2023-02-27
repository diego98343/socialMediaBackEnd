import express, { Express } from "express";
import { chattyServer } from "./setupService";
import databaseConnection from './setupDataBase'

//sudo npm install --save-dev tsconfig-paths    to change import paths
class Application{

    public initialize(): void{
        databaseConnection();
        const app:Express =express();
        const server:chattyServer =new chattyServer(app);
        server.stats();
    }

}

const application: Application =new Application();

application.initialize();



