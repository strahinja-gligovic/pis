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
            res.status(500).json({
                errmsg: 'Error fetching client.'
            });
            return;
        }

        if (client) {
            // odgovaramo objektom
            res.json(client);
        } else {
            // obaveštavamo o grešci
            res.status(500).json({
                errmsg: 'No such client.'
            });
        }
    })
})

clientRouter.get('/list/', function (req, res) {
    // prazan objekat podrazumeva sve dokumente
    Client.find({}, function (error, clients) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error fetching clients.'
            })
        }
        res.json(clients);
    })
})

clientRouter.post('/add/', function (req, res) {
    // iz body zahteva kreiramo instancu client modela
    let client = new Client(req.body);

    client.save(function (error, client) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error saving client.'
            });
        } else {
            res.json(client);
        }
    });
})

clientRouter.put('/update/', function (req, res) {
    const client_id = req.body._id;

    // prvo pronalazimo primljeni klijent
    Client.findOne({
        _id: client_id
    }, function (error, client) {
        if (error || !client) {
            res.status(500).json({
                errmsg: 'Error fetching client.'
            });
        } else {
            // setujemo nove vrednosti iz zahteva
            client.set(req.body);

            // upisujemo izmenjeni klijent
            client.save(function (error, client) {
                if (error) {
                    res.status(500).json({
                        errmsg: 'Error saving client.'
                    });
                } else {
                    res.json(client);
                }
            })
        }
    })
})

clientRouter.delete('/delete/:_id', function (req, res) {
    const client_id = req.params._id;

    Client.findByIdAndRemove(client_id, function (error) {
        if (error) {
            res.status(500).json({
                errmsg: 'Error deleting client.'
            });
        } else {
            // sve OK !
            res.status(200).send('OK');
        }
    })
})

module.exports = clientRouter;