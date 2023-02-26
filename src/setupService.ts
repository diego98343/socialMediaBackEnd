import {Application, json, urlencoded, Response, Request, NextFunction} from 'express';

import http from 'http'
import cors from 'cors'
import helmet from 'helmet';
import hpp from 'hpp'
import cookierSession from 'cookie-session'
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';


// import hpp from 'hpp';
// import cookierSession from 'cookie-session';



// sudo npm i --save @types/express install for the imports to work 
// sudo npm cors helmet hpp cookie-session compression express-async-errors http-status-codes install to store information in cookies 

export class chattyService{

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
                keys: ['test1','test2'],
                maxAge: 24 * 7 *360000,
                secure: false
            })
        );
        
        app.use(hpp());
        app.use(helmet());
        app.use(
            cors({
                origin:'*',
                credentials: true,
                optionsSuccessStatus:200,
                methods:['GET','POST','PUT','DELETE','OPTIONS']
            })   
        )
    }

    

    private standardMiddleware(app:Application):void{}

    private routeMiddleware(app:Application):void{}

    private globalErrorHandler(app:Application):void{}

    private startServer(app:Application):void{}

    private createSocketID(httpServer:http.Server):void{}

    private startHttpServer(httpServer:http.Server): void{}


}