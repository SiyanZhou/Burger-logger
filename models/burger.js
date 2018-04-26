// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");
var count = 0;
function sortResults(results) {
  var newBurgersArray = [];
  var oldBurgersArray = [];
  console.log('pls read me', count);
  count++;
  try {
  results.forEach(function(item){
     if(item.devoured === 0){
      var newBurgerName = {newBurgerName: item.burger_name};
      newBurgersArray.push(newBurgerName);
     }else{
      var oldBurgerName = {oldBurgerName: item.burger_name};
      oldBurgersArray.push(oldBurgerName);
     }
  });
} catch(e) {
  console.log('error:',results,e);
}

  var sortedReuslts = {
    newBurgers: newBurgersArray,
    oldBurgers: oldBurgersArray
  };

  return sortedReuslts;
};


var Burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(sortResults(res));
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (burgersController.js).
module.exports = Burger;
