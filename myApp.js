require('dotenv').config();

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function(result) {
    console.log('Database is connected');
  })
  .catch((err) => {
    console.log('Database is not connected');
    console.log(err);
  });
;


let Person;

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  let David = new Person({
    name: 'David',
    age: 25,
    favoriteFoods: ['pizza', 'wafles', 'chocolate']
  });
  David.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) { 
    if (err) return console.error(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) { 
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) { 
    if (err) return console.error(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
  
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const filter = {name: personName};
  const update = {age: ageToSet};
  Person.findOneAndUpdate(filter, update, {new: true}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  }
  );
};

const removeById = (personId, done) => {
  Person.findByIdandRemove(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);  
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
