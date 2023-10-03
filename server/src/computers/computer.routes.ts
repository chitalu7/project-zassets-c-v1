import * as express from "express";
import * as mongodb from "mongodb"; 
import { collections } from "../database";

export const computerRouter = express.Router();
computerRouter.use(express.json());

// Gets all computers in the DB
computerRouter.get("/", async (_req, res) => {
    try {
        const computers = await collections.computers.find({}).toArray();
        res.status(200).send(computers);
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Gets single computer by ID
computerRouter.get("/:id", async (req, rese) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const computer = await collections.computers.findOne(query);

        if (computer) {
            rese.status(200).send(computer);
        } else {
            rese.status(404).send(`Faild to find a computer: ID ${id}`);
        }

    } catch (error) {
        rese.status(404).send('Failed to find a computer: ID ${req?.params?.id');
    }
});

// Creates a new computer in DB
computerRouter.post("/", async (req, res) => {
    try {
        const computer = req.body;
        const result = await collections.computers.insertOne(computer);

        if (result.acknowledged) {
            res.status(201).send(`Created a new computer: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new computer.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// Updates an existing computer
computerRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const computer = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.computers.updateOne(query, { $set: computer });

        if (result && result.matchedCount) { 
            res.status(200).send(`Updated a computer: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a computer: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a computer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


// Deletes a computer with the given ID
computerRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.computers.deleteOne(query); 

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a computer: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a computer: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a computer: ID ${id}`);
        }
    } catch (error) {
        console.error(error.emssage);
        res.status(400).send(error.message);
    }
});
