const express = require('express');
const { createBusiness, progressWorkflow } = require('./businessController');

const app = express();
app.use(express.json());

app.post('/business', createBusiness);
app.post('/business/:fein/progress', progressWorkflow);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
