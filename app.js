import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import MongoStore from 'connect-mongo';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { connectMongodb } from './utils/connectMongodb.js';
import { swaggerSpecs } from './swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Global setup
await connectMongodb();
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 60 * 60 * 24 * 1000, // 1DAY,
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.ENVIRONMENT == "PRODUCTION",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000,
  }
}

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session cookie config
app.use(session(sessionConfig))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    error: {
      status: 404,
      path: req.originalUrl
    }
  });
});

app.listen(process.env.PORT || 3000,() => {
    console.log(`NodeJs Server started at : ${process.env.PORT || 3000}`)
})

export default app;
