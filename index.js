const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require("compression");
const helmet = require("helmet");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");
// Initialize express
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route
app.use("/", indexRouter);
app.use("/catalog", catalogRouter); 


const dev_db_url =
"mongodb+srv://tomosorijosephmayowa:MongoPass@cluster0.r54f38d.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('connected')
}



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
