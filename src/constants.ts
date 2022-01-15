import dotenv from 'dotenv';

dotenv.config();

export const PRIVATE_KEY: string =
  process.env.PRIVATE_KEY != undefined ? process.env.PRIVATE_KEY : '';

export const INFURA_PROJECT_ID: string =
  process.env.INFURA_PROJECT_ID != undefined
    ? process.env.INFURA_PROJECT_ID
    : '';

export const DAIX_SMART_CONTRACT: string =
  process.env.DAIX_SMART_CONTRACT != undefined
    ? process.env.DAIX_SMART_CONTRACT
    : '';
