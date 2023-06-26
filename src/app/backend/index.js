const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://127.0.0.1:27017/person'; // Replace with your MongoDB connection string

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
    
    // // Create data

    //   // Single document insertion
    //   const document = { name: 'John Doe', age: 30 };
    //   const result = await collection.insertOne(document);
    //   console.log('Inserted document ID:', result.insertedId);

    //   // Multiple document insertion
    //   var documents = [
    //     { name: 'Jane Smith', age: 25 },
    //     { name: 'Mike Johnson', age: 35 },
    //   ];
    //   const results = await collection.insertMany(documents);
    //   console.log('Inserted document IDs:', results.insertedIds);

    //Read
      const documents = await collection.find().toArray();
      // console.log('All documents:', documents);

      const keys = Object.keys(documents[0]);
      // console.log(keys);

    // Iterate through the object properties
    console.log(documents.length);

    // // Update
    //   const documentToUpdate = { _id: new ObjectId('<documentId>') }; // Replace <documentId> with the actual document ID
    //   const updateFields = { $set: { age: 35 } };
    //   const updateResult = await collection.updateOne(documentToUpdate, updateFields);
    //   console.log('Updated document count:', updateResult.modifiedCount);

    // // Delete
    //   const documentToDelete = { _id: new ObjectId('<documentId>') }; // Replace <documentId> with the actual document ID
    //   const deleteResult = await collection.deleteOne(documentToDelete);
    //   console.log('Deleted document count:', deleteResult.deletedCount);

    // //Query
    //   const query = { age: { $gte: 30 } }; // Example query to find documents with age greater than or equal to 30
    //   const documents = await collection.find(query).toArray();

    //   if (documents.length > 0) {
    //     console.log('Matching documents:');
    //     documents.forEach((document, index) => {
    //       console.log(`Document ${index + 1}:`, document);
    //     });
    //   } else {
    //     console.log('No matching documents found.');
    //   }
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
