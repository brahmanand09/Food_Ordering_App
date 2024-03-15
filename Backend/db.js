const mongoose = require("mongoose");

const mongoURI =
  "mongodb://tummyneedyummy:tummyneedyummy@ac-dqjjyzm-shard-00-00.3fbtvtg.mongodb.net:27017,ac-dqjjyzm-shard-00-01.3fbtvtg.mongodb.net:27017,ac-dqjjyzm-shard-00-02.3fbtvtg.mongodb.net:27017/tummyneedyummy?ssl=true&replicaSet=atlas-21qkvk-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,{ useNewUrlParser: true },async (err, result) => {
      if (err) {
        console.log("---", err);
      } else {
        console.log("mongo connected");
        const fetched_data = await mongoose.connection.db.collection("food-items");
        fetched_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection("food-category");
          foodCategory.find({}).toArray(function(err,cateData){
            if (err) {
              console.log(err);
            } else {
              global.food_items = data;
              global.foodCategory = cateData;
            }
          })
          // if (err) {
          //   console.log(err);
          // } else {
          //   global.food_items = data;
          // }
        })
      }
    }
  );
};

module.exports = mongoDB;
