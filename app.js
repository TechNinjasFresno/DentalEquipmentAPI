var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/DentalEquipmentAPI');

var Employee = require('./models/employeeModel');
var Equipment = require('./models/equipmentModel');
var EquipModel = require('./models/equipModelModel');
var EquipRepair = require('./models/equipRepairModel');
var Vendor = require('./models/vendorModel');

var app = express();

var port = process.env.PORT || 3000;

// cors
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

employeeRouter = require('./routes/employeeRoutes')(Employee);
equipmentRouter = require('./routes/equipmentRoutes')(Equipment);
equipModelRouter = require('./routes/equipModelRoutes')(EquipModel);
equipRepairRouter = require('./routes/equipRepairRoutes')(EquipRepair);
vendorRouter = require('./routes/vendorRoutes')(Vendor);


app.use('/api/employees', employeeRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/models', equipModelRouter);
app.use('/api/repairs', equipRepairRouter);
app.use('/api/vendors', vendorRouter);




app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on  PORT: ' + port);
});
