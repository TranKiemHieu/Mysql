import express, { Application } from "express";
import cors from 'cors';
import Server from "./src/index";
//
import Database from "./src/db/index";
import  setupRoutes  from './src/routes';

const db = new Database();
const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

new setupRoutes(app);

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
