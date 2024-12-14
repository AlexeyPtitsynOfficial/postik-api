import express from "express";
import proxy from "express-http-proxy";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const auth = proxy("http://localhost:5001");
const postik = proxy("http://localhost:5002");
const messages = proxy("http://localhost:5003");

app.use("/api/auth", auth);
app.use("/api/postik", postik);
app.use("/api/messages", messages);

const server = app.listen(5000, () => {
  console.log("Gateway listening to Port 5000");
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
