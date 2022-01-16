import express from 'express';
import cors from 'cors';

import * as bodyParser from 'body-parser';
import { createFlow } from './createFlow';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API runing. Ready to accept requests.');
});

app.post('/create-flow', async (req, res) => {
  const { sender, receiver, monthlyAmount } = req.body;
  // const monthlyAmount = await getMonthlyPayment();
  console.log(
    `Streaming ${monthlyAmount} USD monthly from ${sender} to ${receiver}.`
  );
  await createFlow(sender, receiver, monthlyAmount)
    .then((result) => res.send(result))
    .catch((error: Error) => console.error(error));
});

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
