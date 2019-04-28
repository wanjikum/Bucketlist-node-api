import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 4001;

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());

// Parses the text as URL encoded data (which is how browsers tend to send
// form data from regular forms set to POST) and exposes the resulting object
// (containing the keys and values) on req.body.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/api/v1/auth/signup', (req, res) => {
  res.status(200).send({ name: req.body.name, message: 'Welcome to the users route' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
