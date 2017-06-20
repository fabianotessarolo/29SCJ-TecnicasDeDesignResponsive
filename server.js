const express = require ('express');
const bodyParser = require ('body-parser');
const fs = require ('fs');
const dbFolder = __dirname + '/db';
const contatosDbPath = dbFolder + '/contatos.json';
const path = require('path');

if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder);
}

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.post('/api/contato', function (req, res) {
    //le os contatos ja gravados
    tryRead(contatosDbPath, function (contatos) {
        //inclui o novo contato
        contatos.push(req.body);
        //escreve arquivo com o contato novo
        fs.writeFile(contatosDbPath, JSON.stringify(contatos), function (err) {
            if (err) {
                res.status(500).json({ error: 'Opa, detectamos um probleminha, tente novamente mais tarde '});
                return;
        }
        res.status(200).json({ success: true });
        });
    });

    console.log(JSON.stringify(req.body));
});

app.listen(process.env.PORT || 3000, function () {
    console.log('escutando na porta 3000');    
});

var tryRead = function (path, callback) {
    fs.readFile(path, 'utf8', function (err, contatos) {
        if (err) return callback ([]);
        var contatosJSON = [];
        try {
            contatosJSON = JSON.parse(contatos);
        } catch (error) { }
        return callback(contatosJSON);
    });
}

app.get('*', function (req, res) {
    res.status(404).send({ error: 'API Not Found'});
});