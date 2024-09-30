const express = require('express');
const reputationRoutes = require('./routes/reputation');
const app = express();

app.use(express.json());

app.use('/api', reputationRoutes);

app.listen(3000, () => {
    console.log('Reputation AI server running on port 3000');
});
