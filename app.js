/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as db from './db';

const app = express();
const collection = 'todo';

app.use(bodyParser.json());
app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// create
app.post('/', (req, res) => {
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result, document: result.ops[0] });
      }
    });
});

// read
app.get('/getTodos', (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err);
      } else {
        console.log(documents);
        res.json(documents);
      }
    });
});

// update
app.put('/:id', (req, res) => {
  const todoID = req.params.id;
  const userInput = req.body;

  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: db.getPrimaryKey(todoID) },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

// delete
app.delete('/:id', (req, res) => {
  const todoID = req.params.id;
  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoID) }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});

db.connect(err => {
  if (err) {
    console.log('unable to connect database');
    console.log(err);
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log(`connected to database, server running on port 3000`);
    });
  }
});
