var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost/angular-todo');
// // app.configure(function () {
//   app.use(express.static(__dirname + '/public'));
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   // app.use(express.methodOverride());
// // });
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Todo = mongoose.model('Todo', {
  text: String
})

app.get('/api/todos', function (req, res) {
  Todo.find(function (err, todos) {
    if(err){
      res.send(err);
    }
    res.json(todos);
  })
})

app.post('/api/todos', function (req, res) {
  Todo.create({
    text: req.body.text,
    done: false
  }, function (err, todo) {
    if(err){
      res.send(err);
    }
    Todo.find(function (err, todos) {
      if(err){
        res.send(err);
      }
      res.json(todos);
    })
  })
})
app.delete('/api/todos/:todo_id', function (req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if(err){
      res.send(err);
    }
    Todo.find(function (err, todos) {
      if(err){
        res.send(err);
      }
      res.json(todos);
    })
  })
})
app.get('*', function (req, res) {
  res.sendfile('./public/index.html');
})
app.listen(8090, function () {
  console.log('App listenning on port 8090...');
})
