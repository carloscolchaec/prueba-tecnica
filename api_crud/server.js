// Import Modules
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');


// Import Routes
const router = require('./routes');
const clients = require('./routes/clients');
const orders = require('./routes/orders')
const AppError = require("./utils/appError");
const ErrorHandle = require("./utils/errorHandle");

// Config Port
const PORT = 3350;


// Config Cors
const corsConfig = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

// App Use
app.use(cors(corsConfig))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(clients)
app.use(router)
app.use(orders)


app.all("*", (req, res, next) => {
    next(new AppError(`La URL ${req.originalURL} no existe`, 404));
});

app.use(ErrorHandle);



app.listen(PORT, ()  => {
    console.log(`El server esta corriendo en el puerto: ${PORT}`);
})


module.exports = app;