import express, { Express } from "express";

import { chattyServer } from "./setupService";

class Application{

    public initialize(): void{
        const app:Express =express();
        const server:chattyServer =new chattyServer(app);
        server.stats();
    }
}

