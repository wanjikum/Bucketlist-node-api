import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';

import router from './routes';

const app = express();

const PORT = config.PORT || 4001;
mongoose.set('useNewUrlParser', true);

mongoose.connect(config.DATABASE, { useNewUrlParser: true });
const db = mongoose.connection;

console.log('config>>>>', config);

db.on('error', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Failed to establish connection');
  }
});

db.once('open', () => {
  if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    console.log('Connection established');
  }
});

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());

// Parses the text as URL encoded data (which is how browsers tend to send
// form data from regular forms set to POST) and exposes the resulting object
// (containing the keys and values) on req.body.
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/api/v1', router);

export default app;
