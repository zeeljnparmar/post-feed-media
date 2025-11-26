import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);
// Handle invalid JSON syntax
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "invalid_json",
      message: "Request body contains invalid JSON syntax"
    });
  }
  next();
});


app.get('/', (req, res) => res.send('Social Post Module API. See /api'));

export default app;
