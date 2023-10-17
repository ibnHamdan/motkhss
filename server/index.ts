import express from 'express';
import {
  createOpportunityHandler,
  listOpportunitiesHandler,
} from './handlers/opportunityHandler';

const app = express();

app.use(express.json());

app.get('/opportunities/', listOpportunitiesHandler);

app.post('/opportunities', createOpportunityHandler);

app.listen(3000);
