import express from 'express';
import mapRoutes from './routes';

const app = express();
const PORT = 1245;
const hostname = '127.0.0.1'


mapRoutes(app);
app.listen(PORT, hostname, () => {
    console.log (`Server running at http://${hostname}:${PORT}`);
});

export default app;
// module.exports = app;

