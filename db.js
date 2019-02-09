import { MongoClient, ObjectID } from 'mongodb';

const dbname = 'crud_mongodb';
const url = 'mongodb://localhost:27017';
const mongoOPtions = { useNewUrlParser: true };

const state = {
  db: null
};

const connect = cb => {
  if (state.db) {
    cb();
  } else {
    MongoClient.connect(url, mongoOPtions, (err, client) => {
      if (err) {
        cb(err);
      } else {
        state.db = client.db(dbname);
        cb();
      }
    });
  }
};

const getPrimaryKey = _id => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

export { getDB, connect, getPrimaryKey };
