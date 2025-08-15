const express = require("express");
const mongoose = require("mongoose");
const loginRouter = require("./controllers/login");
const registerRouter = require("./controllers/register");

const app = express();
app.use(express.json());

app.use('/auth/register', registerRouter);
app.use('/auth/login', loginRouter )

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

app.listen(3000, () => console.log('Server running on port 3000'));
