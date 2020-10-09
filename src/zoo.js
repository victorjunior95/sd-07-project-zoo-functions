/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals
  .filter(animal => animal.id === ids[0]) // retorno []
  .concat(data.animals.filter(animal => animal.id === ids[1]));

  // if (ids === undefined) {
  //   return [];
  // } else {
  //   for (let i in data.animals) {
  //     if (ids === data.animals[i].id) { //desta maneira só retornava 1 objeto
  //       return [data.animals[i]];
  //     }
  //   }
  // }
}

function animalsOlderThan(nameAnimal, ageAnimal) {
  return data.animals
  .find(animal => animal.name === nameAnimal).residents
  .every(animal => animal.age > ageAnimal);

  // for (let i in data.animals) {
  //   if (data.animals[i].name === animal) {
  //     if (data.animals[i].residents[i].age > age) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // }
}
// console.log(animalsOlderThan('lions', 15));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return [];
  } else {
    return data.employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  }
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
