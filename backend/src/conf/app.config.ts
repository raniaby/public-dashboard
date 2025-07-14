import { registerAs } from '@nestjs/config';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import 'dotenv/config';
import { validateConfig } from '../utils/validateConfig';
import { AppConfig } from './types/app-config.type';

class EnvironmentVariablesValidator {
  @IsNumber()
  @IsPositive()
  API_PORT!: number;

  @IsString()
  CLIENT_URL!: string;

  @IsString()
  NODE_ENV!: string;
}

export default registerAs<AppConfig>('app', (): AppConfig => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    apiPort: parseInt(process.env.API_PORT as string, 10) as number,
    frontendUrl: process.env.CLIENT_URL as string,
    nodeEnv: process.env.NODE_ENV as string,
  };
});
