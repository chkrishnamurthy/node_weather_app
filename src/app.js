const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;
console.log(port);

//Define paths forExpres config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//Setup Handlebars engineand views location
app.set("view engine", "hbs");
app.set("views", viewPath);

//Setuo static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Krishna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Krishna",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Krishna",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide Address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { forecastData }) => {
        if (error) {
          return res.send({ error });
        }
        console.log(forecastData);
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Krishna",
    errorMessage: "Help article not found.",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide search" });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Krishna",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is started..!");
});
