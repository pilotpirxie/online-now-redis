const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {

  /**
   * Middleware for saving information about ip address and timestamp
   * @param  {request} req [Expressjs request]
   * @param  {response} res [Expressjs response]
   * @param  {function} next [Next function to call]
   * @param  {number} TTL Time To Live - how long data will be stored in Redis database
   */
  ping: function (req, res, next, TTL = 30){
    // user ip
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // insert or update key with client ip and timestamp as data
    // setex client:_127.0.0.1 <TTL> 1520541641402
    redisClient.set('client:_' + ip, Date.now(), 'EX', TTL, (err, data) => {
      if (!err) {
        console.log(`${ip} -> ${Date.now()}`);
      } else {
        console.log(err.toString());
      }
      next();
    });
  },

  /**
   * Method for retrieving total number of online users
   * @param  {request} req Expressjs request
   * @param  {response} res Expressjs response
   * @param  {function} callback Function to call after all
   */
  count: function (req, res, callback){
    redisClient.keys('client:_*', (err, data) => {
      if (!err) {
        let online = data.filter(n => n);
        callback(200, JSON.stringify({status: "ok", count: online.length}));
      } else {
        console.log(err);
        callback(500, JSON.stringify({status: "error"}));
      }
    });
  }
}
