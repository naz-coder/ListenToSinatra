const express = require("express");
const app = express();
const port = 8080;

const details = {
  songs: [
    "All of You",
    "Almost Like Being in Love",
    "Always",
    "Among My Souvenirs",
    "Between the Devil and the Deep Blue Sea",
    "Blue Hawaii",
    "Body and Soul",
    "Call Me",
    "Can't We Be Friends",
    "Change Partners",
    "Dancing in the Dark",
    "Don'cha Go 'Way Mad",
    "Exodus",
    "Falling In Love with Love",
    "Five Minutes More",
    "Get Me to the Church on Time",
    "Hey! Jealous Lover",
    "Isn't She Lovely?",
    "My Funny Valentine",
    "Roses of Picardy",
  ],
  wives: ["Nancy Barbato", "Ava Gardner", "Mia Farrow", "Barbara Marx"],
  name: "Francis Albert Sinatra",
  birth_city: "Hoboken, New Jersey",
  birth_date: "December 12, 1915",
  picture:
    "https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2, _Pal_Joey.jpg",
};

app.get("/", (req, res) => {
  let songs = details.songs[Math.trunc(Math.random() * details.songs.length)];
  res.send(songs); //collecting or displaying from the server to the client use respond -res
});

app.get("/birth_date", (req, res) => {
  let birth_date = details.birth_date;
  res.send(birth_date);
});

app.get("/birth_city", (req, res) => {
  let birth_city = details.birth_city;
  res.send(birth_city);
});

app.get("/wives", (req, res) => {
  let wives = details.wives.join(", "); //or .toString
  res.send(wives);
});

app.get("/picture", (req, res) => {
  res.redirect(details.picture); //OR res.send("https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg")
});

//Route to public
app.get("/public", (req, res) => {
  res.send("Everybody can see this page");
});

//Route to protected
app.get("/protected", (req, res) => {
  const authenticate = req.headers.authorization; //sending to the server use request -req

  if (!authenticate) {
    res.status(401);
    res.write("Not authorized\n");
  } else {
    const encoded = authenticate.split(" ")[1]; //spaced split and assign to an array
    const decoded = Buffer.from(encoded, "base64").toString();

    const username = decoded.substring(0, decoded.indexOf(":")); //start at 0, and stop at the end of thhe length
    const password = decoded.substring(decoded.indexOf(":") + 1); //starts from the index of index +1

    if (username !== "admin" || password !== "admin") {
      res.status(401);
      res.write("Not authorized\n");
    } else {
      res.write("Welcome, authenticated client\n");
    }
  }
  res.end();
});

app.listen(port, () => {
  console.log("listening on port 8080");
}); //server
