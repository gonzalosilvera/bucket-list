"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8000;
// Get items
app.get('/list/:userEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.params;
    console.log(userEmail);
    try {
        const query = 'SELECT * FROM list WHERE user_email = $1';
        const values = [userEmail];
        const response = yield db_1.pool.query(query, values);
        res.json(response.rows);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
// Create item
app.post('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, title, checked, date } = req.body;
    const id = (0, uuid_1.v4)();
    try {
        const query = 'INSERT INTO list(id, user_email, title, checked, date) VALUES($1, $2, $3, $4, $5)';
        const values = [id, user_email, title, checked, date];
        const result = yield db_1.pool.query(query, values);
        res.json(result);
    }
    catch (error) {
        console.error(error);
    }
}));
// edit item
app.put('/list/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_email, title, checked, date } = req.body;
    try {
        const query = 'UPDATE list SET user_email=$1, title=$2, checked=$3, date=$4 WHERE id=$5';
        const values = [user_email, title, checked, date, id];
        const result = yield db_1.pool.query(query, values);
        res.json(result);
    }
    catch (error) {
        console.error(error);
    }
}));
// delete item
app.delete('/list/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM list WHERE id=$1;';
        const values = [id];
        const result = yield db_1.pool.query(query, values);
        res.json(result);
    }
    catch (error) {
        console.error(error);
    }
}));
// user sign up
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    try {
        const query = 'INSERT INTO users (email, hashed_password) VALUES($1, $2)';
        const values = [email, hashedPassword];
        const token = jsonwebtoken_1.default.sign({ email }, 'secret', { expiresIn: '1hr' });
        const result = yield db_1.pool.query(query, values);
        res.json({ email, token });
    }
    catch (error) {
        console.error(error.detail);
        error && res.json({ detail: error.detail });
    }
}));
// user login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = yield db_1.pool.query(query, values);
        if (!result.rows.length) {
            return res.json({ detail: "User does not exist!" });
        }
        const success = yield bcrypt_1.default.compare(password, result.rows[0].hashed_password);
        const token = jsonwebtoken_1.default.sign({ email }, 'secret', { expiresIn: '1hr' });
        if (success) {
            res.json({ 'email': result.rows[0].email, token });
        }
        else {
            res.json({ detail: 'Login failed' });
        }
    }
    catch (error) {
        console.error(error);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
