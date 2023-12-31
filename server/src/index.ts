import express, { Express, Request, Response } from 'express';
import { pool } from './db';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app: Express = express();
app.use(cors())
app.use(express.json())
dotenv.config();
const port = process.env.PORT ?? 8000;

// Get items
app.get('/list/:userEmail', async (req: Request, res: Response) => {
  const { userEmail } = req.params
  console.log(userEmail);
  try {
    const query = 'SELECT * FROM list WHERE user_email = $1';
    const values = [userEmail];
    const response = await pool.query(query, values);
    res.json(response.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Create item
app.post('/list', async (req, res) => {
  const { user_email, title, checked, date } = req.body
  const id = uuidv4();
  try {
    const query = 'INSERT INTO list(id, user_email, title, checked, date) VALUES($1, $2, $3, $4, $5)';
    const values = [id, user_email, title, checked, date];
    const result = await pool.query(query, values);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

// edit item
app.put('/list/:id', async (req, res) => {
  const { id } = req.params;
  const { user_email, title, checked, date } = req.body
  try {
    const query = 'UPDATE list SET user_email=$1, title=$2, checked=$3, date=$4 WHERE id=$5';
    const values = [user_email, title, checked, date, id];
    const result = await pool.query(query, values);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

// delete item
app.delete('/list/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM list WHERE id=$1;';
    const values = [id];
    const result = await pool.query(query, values);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

// user sign up
app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try {
    const query = 'INSERT INTO users (email, hashed_password) VALUES($1, $2)';
    const values = [email, hashedPassword];
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
    const result = await pool.query(query, values);
    res.json({ email, token })
  } catch (error: any) {
    console.error(error.detail);
    error && res.json({ detail: error.detail })
  }
})

// user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    if (!result.rows.length) {
      return res.json({ detail: "User does not exist!" })
    }
    const success = await bcrypt.compare(password, result.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })

    if (success) {
      res.json({'email': result.rows[0].email, token})
    }
    else {
      res.json({detail: 'Login failed'})
    }
  } catch (error) {
    console.error(error);
  }
})


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});