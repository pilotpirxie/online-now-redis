const express = require('express');
const redis = require('redis');
const redisClient = redis.createClient();
const app = express();

// app port
const port = process.env.PORT || 8080;

// time to live for ip entry
const TTL = 30;

// retrieve information
// and get number of people on site
app.get('/', (req, res) => {
  redisClient.keys('client:_*', (err, data) => {
    if (!err) {
      let online = data.filter(n => n);
      res.send(JSON.stringify({status: "ok", count: online.length}));
    } else {
      console.log(err);
      res.status(500).send(JSON.stringify({status: "error"}));
    }
  });
});

// ping into database
app.get('/ping', (req, res) => {
  // user ip
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // insert or update key with client ip and timestamp as data
  // setex client:_127.0.0.1 <TTL> 1520541641402
  redisClient.set('client:_' + ip, Date.now(), 'EX', TTL, (err, data) => {
    if (!err) {
      console.log(`${ip} -> ${Date.now()}`);
      res.send(JSON.stringify({status: "ok"}));
    } else {
      console.log(err.toString());
      res.status(500).send(JSON.stringify({status: "error"}));
    }
  });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
});
