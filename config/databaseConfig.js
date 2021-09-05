// Connection 
import { MongoClient } from 'mongodb'; 

async function connectMongoDB() {

    // send to .env file

	 
    const atlasClient = new MongoClient("mongodb+srv://amazonclone:1234@cluster0.kfyjs.mongodb.net/users?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

    // Test DB Connection by listing dbs and uncommenting listDatabases(client) in finally block

    async function listDatabases(client){
       const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    try {
        await atlasClient.connect();
    
    } catch (e) {
        console.error(e);
    }

    // close connection to cluster after above operation

    finally {
        await listDatabases(atlasClient);
        return atlasClient 
    }
}

export default connectMongoDB 