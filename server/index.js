const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const session= require("express-session")
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "deliverydb",
});

const bcrypt = require ("bcrypt");
const { response } = require("express");
const saltRounds= 10

const jwt = require('jsonwebtoken')

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET","POST"],
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}));

app.get("/api/get", (req, res) => {
  const item = req.body.item;
  const qt = req.body.qt;
  const amt = req.body.amt;

  const sqlSelect = "SELECT * FROM product_task";
  db.query(sqlSelect, [item, qt, amt], (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const item = req.body.item;
  const qt = req.body.qt;
  const amt = req.body.amt;
  const sqlInsert = "INSERT INTO product_task (item, qt, amt) VALUES (?,?,?)";
  db.query(sqlInsert, [item, qt, amt], (err, result) => {
    console.log(err);
  });
});


// !User  

app.post("/user-data", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password,saltRounds, (err, hash) => {

  if (err){
    console.log(err)
  }
  const sqlInsert = "INSERT INTO user_data(username,password) VALUES (?,?)";
  db.query(sqlInsert, [username, hash], (err, result) => {
      console.log("err", err);
      if(err)
      {
        res.send({ message: "err" })
      }else{
      res.send({ message: "entered successfully" })
      }
    }
    );
  });
});

app.get("/api/user-data", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM user_data";
  db.query(sqlSelect, [username, password], (err, result) => {
    res.send(result);
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]
  if(!token) {
    res.send("Need token")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) =>{
      if(err) {
        res.json({auth: false, message: "Failed to authenticate"})
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

app.get('/isUserAuth', verifyJWT ,(req, res) => {
  res.send("Authenticated")
})

app.get("/user-login", (req, res) =>{
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.post("/user-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "SELECT * FROM user_data WHERE username=?";
  db.query(sqlInsert, [username], (err, result) => {
    if (err) {
      res.send({ message: "err" });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          
          const id= result[0].id
          const token= jwt.sign({id}, "jwtSecret", {
            expiresIn: 300,
          })
          req.session.user= result

          res.json({ auth: true, token: token, result: result})
        }
        else {
          res.send({ auth: false, message: "Wrong password"});
        }
      })
      console.log(result);
    } else {
      res.json({ auth: false, message: "User doesnt Exist"})
    }
  });
});

// !Admin

app.post("/admin-data", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password,saltRounds, (err, hash) => {

  if (err){
    console.log(err)
  }
  const sqlInsert = "INSERT INTO admin_data(username,password) VALUES (?,?)";
  db.query(sqlInsert, [username, hash], (err, result) => {
    console.log("result", result);
      }
    );
  });
});

app.get("/api/admin-data", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM admin_data";
  db.query(sqlSelect, [username, password], (err, result) => {
    res.send(result);
  });
});

app.get("/admin-login", (req, res) =>{
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false})
  }
})

app.post("/admin-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlInsert = "SELECT * FROM admin_data WHERE username=?";
  db.query(sqlInsert, [username], (err, result) => {
    if (err) {
      res.send({ message: "err" });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user= result
          console.log(req.session.user)
          res.send(result)
        }
        else {
          res.send({ message: "Wrong password"});
        }
      })
      console.log(result);
    } else {
      res.send({ message: "User Doesnt Exist" });
    }
  });
});


app.listen(3001, () => {
  console.log("running on port 3001");
});