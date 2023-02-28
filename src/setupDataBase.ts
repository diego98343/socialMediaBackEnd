
import mongoose from "mongoose";


export default ()=>{

   const connect = ()=>{
       mongoose.connect('mongodb://localhost:27017/chattyApp')
       .then(() =>{
        console.log('successfully connected to data base')
       })
       .catch((error)=>{
         console.log('Error connecting to database',error);
         return process.exit(1);
       });
   };

   connect();

   mongoose.connection.on('disconnected',connect);
   
};
