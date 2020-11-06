import express from 'express';
import { Calculator } from './modules/calculator';
import { Exce } from './modules/exce'
const app = express();
app.use(express.json());

const exce = new Exce();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const calculator = new Calculator;
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.send("bad format");
  }

  res.send({
    height: height,
    weight: weight,
    bmi: calculator.bmi(weight, height)
  });
});

app.post('/excercise', (req, res) => {
  const body = req.body;
  const daily: number[] = body.daily_exercises
  const target: number = body.target
  if (!daily ||!target) res.send({resp: "params missing"})
  if (daily.some(numb => isNaN(numb)) || isNaN(target)) res.send({resp: "bad aparams"})
  const traininnnng = exce.calc(daily, target);
  res.send({
    traininnnng
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});