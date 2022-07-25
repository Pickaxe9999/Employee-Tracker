const {mainMenu} = require('./utils/menus');
const db = require('./db/connection');

//create a connection to the db
db.connect(err => {
    if(err)throw err;
});

//start the UI
mainMenu();