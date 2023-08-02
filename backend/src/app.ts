import express = require("express");
import { Application, Request, Response, NextFunction} from "express";
import cors = require('cors');
import morgan from 'morgan';
import apiRouter from './routes/apiRouter';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
