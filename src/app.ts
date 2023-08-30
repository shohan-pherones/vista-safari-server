import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

/* ENV CONFIG */
dotenv.config();

/* EXPRESS APP */
const app: Application = express();

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mnts
    max: 100, // 100 req. limit
  })
);
app.use(mongoSanitize()); // prevents NoSQL injection attacks
app.use(hpp()); // prevents multiple instances of the same parameter

/* BASIC API ROUTE */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running, waiting for human!' });
});

/* VARIABLES */
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI as string;

/* DB CONNECTION */
mongoose
  .connect(URI)
  .then(() => {
    /* SERVER CONNECTION */
    app.listen(PORT, () => {
      console.log(`Connected to MongoDB & Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
