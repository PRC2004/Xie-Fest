const Express = require('express');
const {MongoClient} = require('mongodb');
const BodyParser = require('body-parser');

const app = Express();
app.use(Express.static(__dirname));
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

const Client = new MongoClient('mongodb://127.0.0.1:27017');
Client.connect();
const database = Client.db('MP5');

app.get('/', (req,res) => {
    res.sendFile(__dirname +'/LandingPage.html');
})

app.post('/SignUp', async (req,res) => {
    const {Name,Gender,Code,Number,Email,Password} = req.body;
    const doc = await database.collection('Accounts').findOne({Email: Email});
    if (doc) {
        res.json({message:'Account Already Registered',redirect:'SignInPage.html'})
    }
    else {
        await database.collection('Accounts').insertOne({Name,Gender,Code,Number,Email,Password});
        var Acc = {Name : Name, ContactNo : "+91 " +Number, Code : Code, Email : Email, Gender : Gender}
        res.json({redirect:'SignInPage.html', Account: Acc});
    }
})

app.post('/SignIn', async (req,res) => {
    const {Name,Number,Email,Password} = req.body;
    const doc = await database.collection('Accounts').findOne({Email: Email,Password:Password})
    if (doc) {
        var Acc = {Name : doc.Name, ContactNo : "+91 " +doc.Number, Code : doc.Code, Email : doc.Email, Gender : doc.Gender};
        res.json({redirect:'HomePage.html',Account: Acc});
    }
    else {
        res.json ({message: 'Account Not Registered', redirect:'SignInPage.html'})
    }
})

app.post('/EventRegister', async (req,res) => {
    Client.connect();
    const {Details,EventName,Host} = req.body;
    var doc = await database.collection('UserEvents').findOne({Email:Details.Email});
    console.log(doc);
    if (doc == null) {
        await database.collection('UserEvents').insertOne({Email : Details.Email, Host : [Host],EventName : [EventName]});
        res.json({message:'Registered For Event : ' +EventName});
    }
    else {
            let doc = await database.collection('UserEvents').findOne({Email:Details.Email,EventName: EventName});
            if (doc == null) {await database.collection('UserEvents').updateOne({Email : Details.Email }, {$push: { Host : Host, EventName : EventName }});
                res.json({message:'Registered For Event : ' +EventName});
            }
            else {res.json({message:'Already registered'})}
    }
})

app.post('/EventLoader', async (req,res) => {
    Client.connect();
    const {Details} = req.body;
    var doc = await database.collection('UserEvents').findOne({Email:Details.Email});
    if (doc) {
        res.json({Host:doc.Host,EventName:doc.EventName});
    }
})

app.listen(3000, (req,res) => {
    console.log('Link : http://localhost:3000');
})