import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { computerRouter } from "./computers/computer.routes";

// Load environment variables from the .env file, 
// where the ATLAS_URI is configured
dotenv.config();

//Uses the ".env" file to access the DB
const { ATLAS_URI } = process.env;

// Checks that the ".env" file is configured. 
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in the config.env");
    process.exit(1);
}

// Connects to DB listening on Port 5200
connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        // start the Express server
        app.use("/computers", computerRouter);


        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200..`);
        });
    })
    .catch(error => console.error(error));
