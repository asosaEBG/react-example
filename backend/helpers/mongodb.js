const { MongoClient } = require('mongodb');
const controller = {};
controller.connectToCluster = async (uri) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Cluster on ATLAS...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Cluster on ATLAS!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Cluster on ATLAS failed!', error);
        process.exit();
    }
}
module.exports = controller;