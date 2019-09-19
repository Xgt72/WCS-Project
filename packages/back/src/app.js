import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.use(bodyParser.json());

app.get('/api/foo', (req, res) => res.json({ foo: 'bar' }));

if (isProd) {
  const buildPath = path.resolve(__dirname, '../../front/build');
  const indexHtml = path.join(buildPath, 'index.html');

  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(indexHtml));
}

module.exports = app;
