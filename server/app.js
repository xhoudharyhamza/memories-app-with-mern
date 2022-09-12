let express = require("express");
let compression = require("compression");
let router = require("./router/routes");
require("dotenv").config();
let app = express();
require("./database/connection");
app.use(compression());
app.use(
  express.json({
    parameterLimit: 100000,
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(router);
let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
