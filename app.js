const express = require('express');
const app = express();
const onlineNowRedis = require('./online-now-redis/online-now-redis');

// app port
const port = process.env.PORT || 8080;

// ping into database
app.use(onlineNowRedis.ping);

// retrieve information
// and get number of people on site
app.get('/', (req, res) => {
  onlineNowRedis.count(req, res, function(httpStatus, data){
    res.status(httpStatus).send(data);
  });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
});
