const express = require('express');
const {promisify} = require('util');
const redis = require('redis');
const redisClient = redis.createClient();
const app = express();

// config
const port = process.env.PORT || 8080;
const TTL = 30;

redisClient.on("error", (err) => {
  console.log(`Error ${err}`);
});

// retrieve information
// and get number of people on site
app.get('/', (req, res) => {
  redisClient.keys('client:_*', (err, data) => {
    if (!err) {
      let online = data.filter(n => n);
      res.send(`{"status": "ok", "count":"${online.length}"}`);
    } else {
      res.send(`{"status":"error", "info":"${err}"}`)
    }
  });
});

// ping into database
app.get('/ping', (req, res) => {
  // user ip
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // insert or update key with client ip and timestamp as data
  // setex client:_127.0.0.1 <TTL> 1520541641402
  redisClient.set('client:_' + ip, Date.now(), 'EX', TTL, (err, res) => {
    if (!err) {
      console.log(`${ip} -> ${Date.now()}`);
    } else {
      console.log(err.toString());
    }
  });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
});
