import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import morgan from "morgan";
import authLawyer from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(morgan("dev"));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", authLawyer);

let server; // Variable to store the server instance

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    server = app.listen(process.env.PORT, () =>
      console.log(
        `Server starting on port http://localhost:${process.env.PORT}`
      )
    );
  } catch (error) {
    console.log(`Error starting server ${error}`);
  }
};

startServer();

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
