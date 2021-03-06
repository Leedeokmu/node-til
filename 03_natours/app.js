const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const dotenv = require('dotenv');
const reviewRouter = require('./routes/reviewRoutes');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config({ path: `${__dirname}/config.env` });

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// serve static files
app.use(express.static(`${__dirname}/public`));

// middlewares
// Set Security HTTP headers
app.use(helmet());
//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);
// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// html form parser
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Data sanitization : against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization : against XSS
app.use(xss());
// prevent parameter pollution
const whitelist = [
  'duration',
  'ratingsQuantity',
  'ratingsAverage',
  'price',
  'maxGroupSize',
  'difficulty',
];
app.use(hpp({ whitelist }));
// cookie-parser
app.use(cookieParser());
// compression
app.use(compression());

app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/', viewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
