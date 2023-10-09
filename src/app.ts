import express, { Express, Request, Response } from "express";
import { constants } from "./config";
import { authRoute, userRoute } from "./routes";

const port = constants.PORT;
const apiVersion = constants.API_VERSION;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/${apiVersion}`, userRoute);
app.use(`/api/${apiVersion}`, authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Running");
});
