require("dotenv").config();
const controller = {};
const mongoConnection = require("../helpers/mongodb");

controller.create = async (req, res) => {
  const uri = process.env.MONGODB_URI;
  let mongoClient;
  try {
    mongoClient = await mongoConnection.connectToCluster(uri);
    const db = mongoClient.db("ejemplo-react");
    const collection = db.collection("person");
    const resultado = await collection.insertOne({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
    });
    await mongoClient.close();
    return res.status(200).json({ codigo: 200, resultado: resultado });
  } catch (err) {
    await mongoClient.close();
    return res.status(500).json({ codigo: 500, resultado: err });
  } finally {
    //  await mongoClient.close();
  }
};

controller.read = async (req, res) => {
  const uri = process.env.MONGODB_URI;
  let mongoClient;
  try {
    mongoClient = await mongoConnection.connectToCluster(uri);
    const db = mongoClient.db("ejemplo-react");
    const collection = db.collection("person");
    var sort = { lastname: 1 };
    const resultado = await collection.find().sort(sort).toArray();
    await mongoClient.close();
    return res.status(200).json({ codigo: 200, resultado: resultado });
  } catch (err) {
    await mongoClient.close();
    return res.status(500).json({ codigo: 500, resultado: err });
  } finally {
    //  await mongoClient.close();
  }
};
controller.update = async (req, res) => {
  var ObjectId = require("mongodb").ObjectId;
  const uri = process.env.MONGODB_URI;
  let mongoClient;
  try {
    mongoClient = await mongoConnection.connectToCluster(uri);
    const db = mongoClient.db("ejemplo-react");
    const collection = db.collection("person");
    const query = { _id: new ObjectId(req.body._id) };
    const update = {
      $set: {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
      },
    };
    const resultado = await collection.updateOne(query, update);
    await mongoClient.close();
    return res.status(200).json({ codigo: 200, resultado: resultado });
  } catch (err) {
    console.log(err);
    await mongoClient.close();
    return res.status(500).json({ codigo: 500, resultado: err });
  } finally {
    //  await mongoClient.close();
  }
};

controller.delete = async (req, res) => {
  var ObjectId = require("mongodb").ObjectId;
  const uri = process.env.MONGODB_URI;
  let mongoClient;
  try {
    mongoClient = await mongoConnection.connectToCluster(uri);
    const db = mongoClient.db("ejemplo-react");
    const collection = db.collection("person");
    var ObjectId = require("mongodb").ObjectId;
    const query = { _id: new ObjectId(req.params._id) };
    const resultado = await collection.deleteOne(query);
    await mongoClient.close();
    return res.status(200).json({ codigo: 200, resultado: resultado });
  } catch (err) {
    console.log(err);
    await mongoClient.close();
    return res.status(500).json({ codigo: 500, resultado: err });
  } finally {
    //  await mongoClient.close();
  }
};

module.exports = controller;
