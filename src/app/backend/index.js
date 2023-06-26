const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://127.0.0.1:27017/person';

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURI);
    const db =client.db('person');
    console.log('Connected to MongoDB database Person.');

    //try
    const collectionName = 'person_data';
    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();

    if (collectionExists) {
      console.log(`The collection '${collectionName}' exists in the 'person' database.`);
      
      const collection = db.collection('person_data');
    
    // CRUD on MongoDB

    // Create data

      // Single document insertion
      const document = { name: 'John Doe', age: 30 };
      const result = await collection.insertOne(document);
      console.log('Inserted document ID:', result.insertedId);

      // Multiple document insertion
      var documents = [
        { name: 'Jane Smith', age: 25 },
        { name: 'Mike Johnson', age: 35 },
      ];
      const results = await collection.insertMany(documents);
      console.log('Inserted document IDs:', results.insertedIds);

    //Reading Part
      var documents = await collection.find().toArray();
      console.log('\nAll documents:',documents.length,'\n');

      //Get keys for index 0, as other keys gonna be same too for other indixes
      const keys = Object.keys(documents[0]);
      // Iterate through the object properties
      for (let i=0;i<documents.length;i++){
        console.log(`Data ID: ${i}`);
        for (x in keys){
          key=keys[x];
          console.log(`==> ${key} : ${documents[i][key]}`);
        }
      };

    // Update
      const documentToUpdate = { _id: documents[0][keys[0]] };
      const updateFields = { $set: { age: 40 } };
      const updateResult = await collection.updateOne(documentToUpdate, updateFields);
      console.log('\nUpdated document count:', updateResult.modifiedCount,'\n');

      console.log('Updated Data:');

      //Get data again from DB
      documents = await collection.find().toArray();
      for (x in keys){
        key=keys[x];
        console.log(`==> ${key} : ${documents[0][key]}`);
      }

    // // Delete
    //   const documentToDelete = { _id: documents[0][keys[0]] }; // Replace <documentId> with the actual document ID
    //   const deleteResult = await collection.deleteOne(documentToDelete);
    //   console.log('\nDeleted document count:', deleteResult.deletedCount,'\n');

    //   console.log('Data after deletion:');

    //   //Get data again from DB
    //   documents = await collection.find().toArray();
    //   for (let i=0;i<documents.length;i++){
    //     console.log(`Data ID: ${i}`);
    //     for (x in keys){
    //       key=keys[x];
    //       console.log(`==> ${key} : ${documents[i][key]}`);
    //     }
    //   };

    //Query
      const query = { age: { $gte: 35 } }; // Example query to find documents with age greater than or equal to 30
      const documentsMatching = await collection.find(query).toArray();
      if (documentsMatching.length > 0) {
        console.log('\nMatching documents:',documentsMatching.length,'\n');
        for (let i=0;i<documentsMatching.length;i++){
          console.log(`Matching ID: ${i}`);
          for (x in keys){
            key=keys[x];
            console.log(`==> ${key} : ${documentsMatching[i][key]}`);
          }
        };
      } else {
        console.log('No matching documents found.');
      }
    } 
    else {
      console.log(`The collection '${collectionName}' does not exist in the 'person' database.`);
    }

    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    // Stop the server
    server.close(() => {
      // CLose the MongoDB
      client.close((err) => {
        if (err) {
          console.error('Error closing MongoDB connection:', err);
          return;
        }
    
        console.log('MongoDB connection closed');
      });
    
      console.log('Server and Database have been stopped');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToMongoDB();
