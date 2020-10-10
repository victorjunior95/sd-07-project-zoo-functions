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

const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
  // const result = data.animals.filter(element => ids.find((item) => {
  //   // if (element.id === item) {
  //   //   return element;
  //   // }
  //   // return undefined;
  //   return element.id === item;
  // }));
}
function animalsOlderThan(animal, age) {
  const animalType = data.animals.find(element => element.name === animal);
  return animalType.residents.every(elem => elem.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  const lnames = data.employees.find(element => element.lastName === employeeName ? element:undefined)
  const fnames = data.employees.find(element => element.firstName === employeeName ? element:undefined)
  return lnames || fnames;
}

console.log(employeeByName())

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
