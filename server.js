const express = require('express');
const db = require('./db/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//use routes
app.use('/', routes);

//default if a route is not found
app.use((req, res) => {
    res.status(404).end();
})

//start the server after connecting to the db
db.connect(err => {
    if(err)throw err;
    console.log('database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})