import express from 'express';
import cors from 'cors';

import db from './database/connection.js';
import stationRoutes from './routes/stations.js';
import scheduleRoutes from './routes/schedules.js';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

const app = express();

app.use(express.json({
  limit: '30mb',
  extended: true
}));
app.use(express.urlencoded({
  limit: '30mb',
  extended: true
}));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/stations', stationRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 5000;

db.authenticate().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
})
