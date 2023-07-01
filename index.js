const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors')
const userRouter = require('./router/user.router');
const relationRouter = require('./router/relation.router');

// Call connecting to neo4j database
let initDatabase = require("./config/db");
initDatabase.configurationNeo4j()


app.use(cors())
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: 10000 }));


app.use("/api/users", userRouter);
app.use("/api/relations", relationRouter);

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).send({
        message: err.message
    })
})

app.listen(3000, () => {
    console.log("Server listening on 3000")
}
)