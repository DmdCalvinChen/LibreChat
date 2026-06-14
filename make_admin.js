const { MongoClient } = require('mongodb');

async function makeAdmin() {
  const uri = "mongodb://127.0.0.1:27017/LibreChat";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('LibreChat');
    const users = database.collection('users');
    
    // Update all users to have the ADMIN role
    const result = await users.updateMany({}, { $set: { role: 'ADMIN' } });
    
    console.log(`Successfully updated ${result.modifiedCount} user(s) to ADMIN role.`);
  } finally {
    await client.close();
  }
}

makeAdmin().catch(console.dir);
