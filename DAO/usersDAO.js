// this file interacts with the mongodb node js driver for CRUD operations

import { MongoClient } from "mongodb";

let userCollection; 
const collection = process.env.COLLECTION_NS;
 
export default class UserDAO {

    static async connectDB(conn) {
        if (userCollection) {
          return
        }
        try {
          // reference to restaurants collection
          userCollection = await conn.db(collection).collection("users")   
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in restaurantsDAO: ${e}`,
          )
        }
    };

    // create new user
    static async  createUser(newUser){
        // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
        const result = await userCollection.insertOne(newUser);
        console.log(`New user ${newUser} created with the following id: ${result.insertedId}`);
    };

    
  static async fetchUser(
    user ) {
    let cursor
    
    try {
      cursor =  await userCollection.find({"email" : user.email, "password" : user.password}); 
      console.log('recieved data into cursor data is as follows ' + cursor)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return []
    }
  
    try {
    const listUser = await cursor.toArray();
    user = listUser; 
    console.log(`user has been set to the following >>> ${user}`)
    return listUser; 

    } catch (e) {
     return console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )     
    } 
  }

  static async createOrder(userCollection, user, order){
    try {
      console.log( `data at creatOrder method coming from order controller is as follows : >> ${user, order}`)
      const insertOrder  = await userCollection.insertOne({user}, order); 
      console.log(`insertOrder operation result >>> ${insertOrder}`)
    }
    catch (e) {
      return console.error(`Unable to create Order >>> ${e}`)

    }
  }
};



 

// sample insert Many operation
/**
//  * Create multiple Airbnb listings
//  * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
//  * @param {Object[]} newListings The new listings to be added
//  */
// async function createMultipleListings(client, newListings){
//     // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

//     console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
//     console.log(result.insertedIds);
// }

 