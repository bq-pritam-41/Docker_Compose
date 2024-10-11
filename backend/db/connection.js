import fs from "fs";
import { MongoClient, ServerApiVersion } from "mongodb";

// Read MongoDB URI from the file
const URI = fs.readFileSync("../mongo_uri.txt", "utf-8").trim();
console.log(URI);

// Create a new MongoClient
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to the MongoDB server
async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    return client.db("employees"); // Return the database reference
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Rethrow the error for further handling
  }
}

// Call the function to connect
let db;

(async () => {
  try {
    db = await connectToDatabase();
  } catch (err) {
    console.error("Failed to connect to the database. Exiting...");
    process.exit(1); // Exit the process if unable to connect
  }
})();

export default db;
