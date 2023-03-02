import {Application, json, urlencoded, Response, Request, NextFunction, request} from 'express';

import http from 'http'
import cors from 'cors'
import helmet from 'helmet';
import hpp from 'hpp'
import cookierSession from 'cookie-session'
import HTTP_STATUS from 'http-status-codes';
import 'express-async-errors';
import compression from 'compression'
import { config } from './config';
import { Server } from 'socket.io';

//brew install redis
import {createClient} from 'redis'
import {createAdapter} from '@socket.io/redis-adapter'
//routes import 
import applicationRoutes from  './routes'
import { CustomError, IErrorResponse } from './shared/globals/helpers/error-handlers';


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

   

    private routeMiddleware(app:Application):void{
        applicationRoutes(app);
    }


    private globalErrorHandler(app:Application):void{
        //to catch error that are not available
        app.all('*',(req:Request,res:Response)=>{
            res.status(HTTP_STATUS.NOT_FOUND).json({message: `${req.originalUrl} not found`})
        });

        app.use((error: IErrorResponse,req:Request,res:Response,next:NextFunction)=>{
            console.log(error);
            if(error instanceof CustomError){
                return res.status(error.statusCode).json(error.serializeErrors());
            }
            next();
        })
    }




    private async createSocketID(httpServer:http.Server):Promise<Server>{

        const io: Server =new Server(httpServer,{
            cors:{
                origin:config.CLIENT_URL,
                methods:['GET','POST','PUT','DELETE','OPTIONS']
            }
        });

        const pubClient = createClient({url:config.REDIS_HOST});
        const subCient = pubClient.duplicate();

        await Promise.all([pubClient.connect(),subCient.connect()]);
        io.adapter(createAdapter(pubClient,subCient));
        return io;
    }



    private startHttpServer(httpServer:http.Server): void{

        console.log(`Server has started with process${process.pid}`)

        httpServer.listen(SERVER_PORT, ()=>{
            console.log('server running on port '+ SERVER_PORT)
        });
    }



    private async startServer(app:Application):Promise<void>{   
        try{
            const httpServer: http.Server = new http.Server(app);
            const socketOP:Server = await this.createSocketID(httpServer);

            this.startHttpServer(httpServer);
            this.socketIOConnections(socketOP);
        }catch(error){
            console.log(error);
        }
    }


    private socketIOConnections(io:Server):void{ }

}