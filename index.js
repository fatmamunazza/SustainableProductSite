const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNECTION ERR ${err}`));

// midlewares
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
readdirSync("./src//routes").map((r) =>
  app.use("/api", require("./src/routes/" + r))
);

const port = process.env.PORT || 1333;

app.listen(port, () => console.log(`Server is running at ${port}`));

// set up Swagger UI

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
