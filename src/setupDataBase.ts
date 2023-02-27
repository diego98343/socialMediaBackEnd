import mongoose from "mongoose";
import mangoose from "mongoose";

export default ()=>{
   const connect = ()=>{
       mongoose.connect('mongodb://localhost:27017/chattyapp-backend')
       .then(() =>{
        console.log('successfully connected to data base')
       })
       .catch((error)=>{
         console.log('Error connecting to database');
         return process.exit(1);
       });
   };
   connect();

   mangoose.connection.on('disconnected',connect);
   
};
