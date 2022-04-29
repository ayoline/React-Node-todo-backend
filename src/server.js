const express = require("express");
const cors = require("cors");
const todosRoutes = require("./todos.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(todosRoutes);

app.listen(3333, () => console.log('server is up in 3333'))