import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

// .env configuration
dotenv.config();

// express app
const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min.
    max: 100, // 100 req. limit
  })
);
app.use(mongoSanitize()); // prevents NoSQL injection attacks
app.use(hpp()); // prevents multiple instances of the same parameter

// basic api route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is up and running, waiting for human to handle! 😎',
  });
});

// curated variables
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URI as string;

// db connection
mongoose
  .connect(URI)
  .then(() => {
    // server listening
    app.listen(PORT, () => {
      console.log(`✅ Server is up and running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });
