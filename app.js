const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/files', fileRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));