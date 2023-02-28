//install npm install dotenv

import dotenv from 'dotenv';

dotenv.config({});

class Config{
    public DATABASE_URL: string;
    public JWT_TOKEN :string;
    public NODE_ENV:string;
    public SECRET_KET_ONE:string;
    public SECRET_KET_TWO:string;
    public CLIENT_URL:string;

   
    constructor(){
        this.DATABASE_URL =process.env.DATABASE_URL || this.DATABASE_URL;
    }
};

export const config: Config= new Config();
