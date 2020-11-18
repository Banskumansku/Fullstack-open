import express from 'express';
import diagnoseRouter from './routes/diagnoses'
import patientsRouter from './routes/patients'
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});