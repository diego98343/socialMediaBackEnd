import {Application, json, urlencoded, Response, Request, NextFunction} from 'express';

import http from 'http'
import cors from 'cors'
import helmet from 'helmet';
import hpp from 'hpp'
import cookierSession from 'cookie-session'
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';
import compression from 'compression'
import { config } from './config';



// sudo npm i --save @types/express install for the imports to work 
// sudo npm cors helmet hpp cookie-session compression express-async-errors http-status-codes install to store information in cookies 


const SERVER_PORT =6000;

export class chattyServer{


    private app: Application;


    constructor(app:Application){
        this.app =app;
    }


    public stats():void{
        this.secutiryMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app)
    }
    

    private secutiryMiddleware(app:Application):void{
        app.use(
            cookierSession({
                name:'session',
                keys: [config.SECRET_KET_ONE,config.SECRET_KET_TWO],
                maxAge: 24 * 7 *360000,
                secure: config.NODE_ENV != 'development'
            })
        );
        
        app.use(hpp());
        app.use(helmet());
        app.use(
            cors({
                origin:config.CLIENT_URL,
                credentials: true,
                optionsSuccessStatus:200,
                methods:['GET','POST','PUT','DELETE','OPTIONS']
            })   
        )
    }



    private standardMiddleware(app:Application):void{
        app.use(compression());
        app.use(json({limit:'50mb'}));
        app.use(urlencoded({extended: true, limit:'50mb'}))
    }

   

    private routeMiddleware(app:Application):void{}

    private globalErrorHandler(app:Application):void{}


    private createSocketID(httpServer:http.Server):void{}




    private startHttpServer(httpServer:http.Server): void{
        httpServer.listen(SERVER_PORT, ()=>{
            console.log('server running on port '+ SERVER_PORT)
        });
    }


    private async startServer(app:Application):Promise<void>{   
        try{
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        }catch(error){
            console.log(error);
        }
    }


}