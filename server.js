// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/1995_api');
mongoose.Promise = global.Promise;


let PersonSchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true })

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let Person = mongoose.model("Person", PersonSchema);
// ==============================




// ===== ROUTES! ======
app.get('/', function(req, res) {
    Person.find({}, function(err, persons) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "Error", error: err })
        } else {
            // respond with JSON
            res.json({ message: "Success", data: persons })
        }
    })
})

app.get("/new/:name", function(req, res) {
    person = new Person({ name: req.params.name });
    person.save(function(err) {
        if (err) {
            res.json("Error saving new person");
        } else {
            res.redirect("/");
        }
    })
})

app.get("/remove/:name", function(req, res) {
    Person.remove({ name: req.params.name }, function(err) {
        if (err) {
            res.json("Error removing person");
        } else {
            res.redirect("/");
        }
    })
})

app.get("/:name", function(req, res) {
    Person.findOne({ name: req.params.name }, function(err, person) {
        if (err) {
            res.json("Error loading response")
        } else {
            res.json(person);
        }
    })
})

// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function() {
    console.log("Express on port 8000!")
});
// =============================




// ======= HERE BE DRAGONS (or possibly socket code) ========

// ==========================================================