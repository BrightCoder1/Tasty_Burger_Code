require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectDB = require("./db");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const userData = require("./schema/person");

app.use(express.static("public"));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("Home");
});

// menu page
app.get("/menu", (req, res) => {
  res.status(201).render("menu");
});

app.get("/register", (req, res) => {
  res.status(201).render("register");
});

app.get("/login", (req, res) => {
  res.status(201).render("login");
});

// Regsiter Page (POST method)
app.post("/register", async (req, res) => {
  try {
    const registerEmployee = new userData({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });
    const register = await registerEmployee.save();

    res.status(201).render("Home");
  } catch (error) {
    res.status(404).render("error");
  }
});

// Login Page
app.post("/login", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const password = req.body.password;

    const userFindData = await userData.findOne({ email: userEmail });

    const isMatchPassword = await bcrypt.compare(
      password,
      userFindData.password
    );

    if (isMatchPassword) {
      res.status(201).render("Home");
    } else {
      res.status(404).render("error");
    }
  } catch (error) {
    res.status(404).render("error");
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
