const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const db = require("./models");
const Routes = require("./routes/Routes");

// //Routers
// const postRouter = require('./routes/Posts')
// app.use("/posts",postRouter)

// const commentsRouter = require('./routes/Comments')
// app.use("/comments",commentsRouter)

// const studentRouter = require('./routes/Students')
// app.use("/students",studentRouter)

// const userRouter = require('./routes/Users')
// app.use("/users",userRouter)

app.use("/api", Routes);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
