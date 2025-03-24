const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB connection successful!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/events', require('./routes/events'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle server shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit(0);
});

// Add this after other middleware
app.get('/test', async (req, res) => {
  try {
    const database = client.db("ridersadda");
    const collection = database.collection("test");
    
    // Insert a test document
    await collection.insertOne({ message: "Test successful", timestamp: new Date() });
    
    // Retrieve the test document
    const result = await collection.findOne({ message: "Test successful" });
    
    res.json({ 
      status: "success",
      message: "Database connection working",
      data: result 
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error",
      message: error.message 
    });
  }
});