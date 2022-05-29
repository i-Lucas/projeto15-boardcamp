import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

import categoriesRouter from './routers/categories.js';
import GamesRouter from './routers/games.js';
import CustomersRouter from './routers/customers.js';
import RentalsRouter from './routers/rentals.js';

app.use(categoriesRouter);
app.use(GamesRouter);
app.use(CustomersRouter);
app.use(RentalsRouter);

dotenv.config();
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));