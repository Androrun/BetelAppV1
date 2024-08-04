// backend/src/index.js
import 'dotenv/config'; // Asegúrate de que dotenv esté instalado y configurado
import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
