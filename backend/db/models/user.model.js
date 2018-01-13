const mongoose = require('mongoose');
// modul za hash/unhash passworda
const bcrypt = require('bcrypt');
// random broj korišćen za hash/unhash
const saltRounds = 10;

var userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true, required: true },
    password: String
});

// funkcija koja pretvara plain text string u hashirani i čuva u DB
// ulazni parametar je tu zbog načina funkcionisanja mongoose
userSchema.pre('save', function (next) {
    // u ovom kontekstu this je user objekat nad kojim pozivamo .save()
    var user = this;

    // ne želimo da hashujemo ako nismo menjali password
    if (!user.isModified('password')) return next();

    // asinhrono generišemo salt
    bcrypt.genSalt(saltRounds, function (err, salt) {
        // u callback koristimo salt i hashiramo password
        bcrypt.hash(user.password, salt, function (err, hash) {
            // upisujemo hash
            user.password = hash;
            // sledeću funkciju pozivamo da bi se nastavio tok programa (tj save())
            // opet, ovo je ovde čisto zbog prirode mongoose modula i javascript
            next();
        });
    });
});

// funkcija koja za datog korisnika proverava password
userSchema.methods.comparePasswords = function (password, cb) {

    // string $password se ponovo hashuje i proverava se da li odgovara sa hashom upisanim u DB 
    bcrypt.compare(password, this.password, function (error, result) {
        if (error) return cb(error);
        // vraćamo rezultat poređenja (prvi parametar error objekat)
        cb(null, result);
    });

}

module.exports = mongoose.model('User', userSchema);