import * as mongodb from "mongodb";
import { Computer } from "../src/computers/computer";

export const collections: {
    computers? : mongodb.Collection<Computer>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("zassets-062523-cluster0");
    await applySchemaValidation(db);

    const computersCollection = db.collection<Computer>("computers");
    collections.computers = computersCollection;
}

// Update our existing collection with JSON schema validation so we know 
// our documents will always match the shape of our Employee model, even 
// if added elsewhere.
// For more information about schema validation, 
// see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "serial", "manufacturer", "model", "ram", "location"],
            additionalProperties: false,
            properties: {
                _id: {},

                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                }, 

                serial: {
                    bsonType: "string",
                    description: "'serial' is required and is a string",
                },

                manufacturer: {
                    bsonType: "string",
                    description: "'manufacturer' is required and is a string",
                }, 

                model: {
                    bsonType: "string",
                    description: "'model' is required and is as string",
                }, 

                ram: {
                    bsonType: "string", 
                    description: "'ram' is required is a string",
                },

                location: {
                    bsonType: "string",
                    description: "'location' is required and is one of 'mailroom', 'admin', or 'client'",
                    enum: ["mailroom", "admin", "client"],
                },
            },
        },
    };

    // Try applying the modification to the collection, if the collection 
    // doesn't exist, create it

    await db.command({
        collMod: "computers", 
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("computers", {validator: jsonSchema});
        }
    });

}