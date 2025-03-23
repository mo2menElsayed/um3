const http = require('http') // http
const dotenv = require('dotenv'); // .env
const app = require('./app');

// configure dotenv
dotenv.config()

// port
const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});

