const express = require('express');
require('./db/mongoose');

const userRoute = require('./routers/userRoute');
const taskRoute = require('./routers/taskRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //automatically parse json into object
app.use(userRoute); // this will register user route to express server
app.use(taskRoute);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})