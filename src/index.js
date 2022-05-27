import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

import categoriesRouter from './routers/categories.js';

app.use(categoriesRouter);

dotenv.config();
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));