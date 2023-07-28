import { Pool } from 'pg'
import dotenv from 'dotenv';
dotenv.config()

export const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: Number(process.env.DBPORT),
    database: 'bucket-list'
})