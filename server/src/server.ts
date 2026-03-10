import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import api from './api/v1';
import { initDb } from './db/initDb';

// Load environment variables
dotenv.config({ path: process.cwd() + '/.env' });


const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/generated_forms', express.static(path.resolve(__dirname, '../../generated_forms')));
app.use('/ridiculous_forms', express.static(path.resolve(__dirname, '../../ridiculous_forms')));

// API routes
app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.json({ status: 'API_UP', message: 'Use Next.js client on port 3000 and API on /api/v1' });
});


// Start the server
async function start() {
  const shouldInitDb = (process.env.AUTO_INIT_DB ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';
  if (shouldInitDb) {
    await initDb();
  } else {
    console.log('AUTO_INIT_DB=false: skipping automatic schema/data bootstrap.');
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to initialize server:', error);
  process.exit(1);
});
