# online-now-redis
Count and view number of online users on your website.

### Quick Start
Download files:
```
$ git git@github.com:pilotpirxie/online-now-redis.git
```
or:
```
$ wget https://github.com/pilotpirxie/online-now-redis/archive/1.1.0.zip
```
install dependencies:
```
npm install
```
and run
```
node app.js
```

### Configuration
```js
// redis server hostname and port
// leave empty for default (localhost, 6379)
const redisClient = redis.createClient();

// time to live for ip entry
const TTL = 30;
```

### Usage
```js
// require module
const onlineNowRedis = require('./online-now-redis/online-now-redis');

// and use it as middleware
app.use(onlineNowRedis.ping);

// and call to get total online count 
app.get('/', (req, res) => {
  onlineNowRedis.count(req, res, function(httpStatus, data){
    res.status(httpStatus).send(data);
  });
});
```

### Manually ping 
Use Ajax GET request to ping and retrieve information.
```js
// on client side
setInterval(() => {
  $.get('/ping');
  $.get('/', (res)=>{
    console.log(JSON.parse(res));
  });
}, 10000);

// on server side
app.get('/ping', (req, res) => {
  onlineNowRedis.ping(req, res, callback, TTL);
});
```
### License
```
MIT
```
