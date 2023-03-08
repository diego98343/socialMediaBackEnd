//install npm install dotenv

import dotenv from 'dotenv';
//loger import to replace console.log
import bunyan from 'bunyan';

import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public DATABASE_URL: string;
  public JWT_TOKEN: string;
  public NODE_ENV: string;
  public SECRET_KET_ONE: string;
  public SECRET_KET_TWO: string;
  public CLIENT_URL: string;

  public REDIS_HOST: string;
  public CLOUD_NAME: string;
  public CLOUD_API_KEY: string;
  public CLOUD_API_SECRET: string;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyApp';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KET_ONE = process.env.SECRET_KET_ONE || '';
    this.SECRET_KET_TWO = process.env.SECRET_KET_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';

    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY= process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET= process.env.CLOUD_API_SECRET || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`configuration ${key} is undifined`);
      }
    }
  }

  //cloudinary config
  public cloudinaryConfig(){
  cloudinary.v2.config({

  cloud_name: this.CLOUD_NAME,
  api_key:this.CLOUD_API_KEY,
  api_secret:this.CLOUD_API_SECRET

  });
  }
}

export const config: Config = new Config();
