const express = require ('express');
const bodyParser = require ('body-parser');
const fs = require ('fs');
const dbFolder = __dirname + '/db';
const contatosDbPath = dbFolder + '/contatos.json';

if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('*', function (req, res) {
    res.status(404).send({ error: 'API Not Found'});
});

app.post('/api/contato', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.status(200).json({ success : true });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('escutando na porta 3000');    
});