server = require("fastify")({ logger: true });
server.register(require('fastify-cors'))
const MongoClient = require('mongodb').MongoClient;
const vk = new (require('./utils/vk-api'))(); //------------------------SET TOKEN
const initialize = require('./utils/db-initialize');
const {postUpdate} = require('./utils/postMaker');
const Cron = require('cron').CronJob;


(async () => {
  try {

    //mongo connect
    const mongo = await MongoClient.connect(
      process.env.MONGOURL || 'mongodb://127.0.0.1:27017',
      { useNewUrlParser: true }
    )

    //initialize base due first launch
    const collection = mongo.db('vk').collection('posts') 
    if (await collection.countDocuments() ==  0) await initialize(collection, vk)

    new Cron({
      cronTime: '00 00 */1 * * *',
      onTick: postUpdate.bind(null, collection, vk),
      
    }).start()


    //initialize routes and global server object
    server.decorate("mongo", collection);
    server.route(require("./routes/stat-get"));


    await server.listen(process.env.PORT || 5000, "0.0.0.0");

  } catch (err) {
    console.log(err);
  }
})();
