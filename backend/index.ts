import express from 'express'
import router from './rutas/interprete'
const app = express();
app.use(express.json());
const PORT = 5000;

app.use('/interprete', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});