const express = require('express');
const clientRouter = express.Router();
const Client = require('../../db/models/client.model');

clientRouter.get('/get/:_id', function (req, res) {
    // iz URL parametra kupimo ObjectId
    const client_id = req.params._id;

    // prosleđujemo za pretragu
    Client.findById(client_id, function (error, client) {
        // obaveštavamo o grešci
        if (error) {
            res.status(500).json({ errmsg: "No such client." });
            return;
        }

        if (client) {
            // odgovaramo objektom
            res.json(client);
        } else {
            // obaveštavamo o grešci
            res.status(500).json({ errmsg: "No such client." });
        }
    })
})

clientRouter.get('/list/', function (req, res) {
    // prazan objekat podrazumeva sve dokumente
    Client.find({}, function (error, clients) {
        res.json(clients);
    })
})

clientRouter.post('/add/', function (req, res) {
    // iz body zahteva kreiramo instancu client modela
    let client = new Client(req.body);

    client.save(function (error, client) {
        if (error) {
            res.status(500).json({ errmsg: "That's not a client." });
        } else {
            res.json(client);
        }
    });
})

clientRouter.put('/update/', function (req, res) {
    const client_id = req.body._id;

    // prvo pronalazimo primljeni klijent
    Client.findOne({ _id: client_id }, function (error, client) {
        if (error || !user) {
            res.status(500).json({ errmsg: "No such client." });
        } else {
            // setujemo nove vrednosti iz zahteva
            client.set(req.body);

            // upisujemo izmenjeni klijent
            client.save(function (error, client) {
                if (error) {
                    res.status(500).json({ errmsg: "Woops." });
                } else {
                    res.json(client);
                }
            })
        }
    })
})

clientRouter.delete('/delete/:_id', function (req, res) {
    const client_id = req.params._id;

    Client.findByIdAndRemove(client_id, function(error) {
        if (error) {
            res.status(500).json({ errmsg: "Woops." });
        } else {
            // sve OK !
            res.sendStatus(200);
        }
    })
})

module.exports = clientRouter;