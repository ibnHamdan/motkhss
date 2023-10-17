import express from 'express';
import { db } from './datastore';

const app = express();

app.use(express.json());

app.get('/opportunities/', (req, res) => {
  res.send({ post: db.listOpportunities() });
});

app.post('/opportunities', (req, res) => {
  const opportunity = req.body;
  db.creatOpportunity(opportunity);
  res.sendStatus(200);
});

app.listen(3000);
