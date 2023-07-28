import express, { Express, Request, Response } from 'express';
import { pool } from './db';
import cors from 'cors';
import dotenv from 'dotenv';

const app: Express = express();
app.use(cors())
dotenv.config();
const port = process.env.PORT ?? 8000;

app.get('/list/:userEmail', async (req: Request, res: Response) => {
  const { userEmail } = req.params
  console.log(userEmail);
  try {
    const response = await pool.query('SELECT * FROM list WHERE user_email = $1', [userEmail]);
    res.json(response.rows);
  } catch (error) {
    console.error(error)
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});