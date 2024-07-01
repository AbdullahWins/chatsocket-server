//cors config
const cors = require("cors");
const corsOptions = {
  origin: [
    //for development
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1/3000",
    "http://127.0.0.1/5173",
    "http://127.0.0.1/5174",
    "http://127.0.0.1/5175",

    //for deployment
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//with configuration
// const initializeCors = (app) => {
//   app.use(cors(corsOptions));
// };

//without any configuration
const initializeCors = (app) => {
  app.use(cors());
};

module.exports = { initializeCors };
