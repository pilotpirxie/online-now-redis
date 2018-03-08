# online-now-redis
Count and view number of online users on your website.

### Quick Start
Download files:
```
$ git git@github.com:pilotpirxie/online-now-redis.git
```
or:
```
$ wget https://github.com/pilotpirxie/online-now-redis/archive/1.0.0.zip
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
```
// redis server hostname and port
// leave empty for default (localhost, 6379)
const redisClient = redis.createClient();

// app port
const port = process.env.PORT || 8080;

// time to live for ip entry
const TTL = 30;
```

### How to ping and retrieve data?
Use Ajax GET request to ping and retrieve information.
```
$.get('/ping');

$.get('/', (res)=>{
  console.log(JSON.parse(res));
});
```
### License
```
MIT
```
