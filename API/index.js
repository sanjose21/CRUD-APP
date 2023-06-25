const app = require('./app');
require('dotenv').config({ path: '../.env' });

const port = process.env.APIPORTI;

app.listen(port, () => console.log(`server running on port ${port}`));
