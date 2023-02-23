require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cors());

const Routes = require("./routes/Routes");
const errorHandler = require("./middleware/errorHandler");

// //Routers
// const postRouter = require('./routes/Posts')
// app.use("/posts",postRouter)

// const commentsRouter = require('./routes/Comments')
// app.use("/comments",commentsRouter)

// const studentRouter = require('./routes/Students')
// app.use("/students",studentRouter)

// const userRouter = require('./routes/Users')
// app.use("/users",userRouter)

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
    limitHandler: (req, res, next) => {
      try {
        const error = new Error("Your File is bigger than 10 MB.");
        error.statusCode = 413;
        throw error;
      } catch (error) {
        next(error);
      }
    },
  })
);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api", Routes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use(errorHandler);
