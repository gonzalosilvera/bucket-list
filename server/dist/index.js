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
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
