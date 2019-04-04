const express = require('express');
const app = express();
const api = require('./api/v1/index');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());
app.use('/api/v1', api); //localhost:3000/api/v1
app.use((req, res) =>{
    const err = {
        'status': 404,
        'message': '404: not Found!!!!'
    }
    res.json(err)
});

mongoose.connect('mongodb://localhost:27017/whiskycms', { useNewUrlParser: true });
connection.on('error', (err) => {
    console.error(`connection to MongoDB error: ${err.message}`);
});

connection.once('open', () => {
    console.log('Connecting to MongoDB :)');

    app.listen(app.get('port'), () => {
        console.log(`express server listening on port ${app.get('port')}`);
    });
})
