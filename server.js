var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path')

mongoose.connect('mongodb://localhost/restful');
var TaskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String, default: " " },
    completed: { type: Boolean, default: false }
}, { timestamp: true });

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task')
app.use(express.static(__dirname + '/public/dist/public'));

app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success!', data: tasks })
        }
    })
})

// GET: Retrieve all Tasks
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            res.json({ message: "error", error: err })
        }
        else {
            res.json({ message: 'Success! All tasks!', data: tasks })
        }
    })
})

// GET: Retrieve a Task by ID
app.get('/tasks/:id', function (req, res) {
    console.log('fpp', req.params)
    Task.findOne({ _id: req.params.id }, function (err, task) {
        console.log(err)
        console.log(task)
        console.log('---------')
        if (err) {
            res.json({ message: 'error', data: err })
        } else {
            console.log(task)
            res.json({ message: 'Success! Task by ID!', data: task })
        }
    })
})

// POST: Create a Task
app.post('/create', function (req, res) {
    var task = new Task({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    })
    task.save(function (err, tasks) {
        if (err) {
            res.json({ message: 'error', error: err })
        } else {
            res.json({ message: 'Success! Created a Task!', data: tasks })
        }
    })
})

// PUT: Update a Task by ID
app.put('/tasks/:id', function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            description: req.body.description, completed: req.body.completed
        }
    }, function (err, tasks) {
        if (err) {
            res.json({ message: 'error' })
        } else {
            res.json({ message: 'Success! Update a Task by ID', data: tasks })
        }
    })
})

// DELETE: Delete a Task by ID
app.delete('/:id', function (req, res) {
    Task.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log('Returned Error: ', err);
            res.json({ message: 'error' })
        }
        else {
            res.json({ message: "Success" })
            res.redirect('/')
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});
const server = app.listen(8000);