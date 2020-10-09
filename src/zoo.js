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
  const out = [];
  ids.forEach((element) => {
    out.push(data.animals.find(animal => animal.id === element));
  });
  return out;
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(element => element.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const out = {};
  Object.assign(
    out,
    data.employees.find(
      employee => employee.firstName === employeeName || employee.lastName === employeeName,
    ),
  );
  return out;
}

function createEmployee({id,firstName,lastName}, {managers,responsibleFor}) {
  return Object.assign({}, {id,firstName,lastName,managers,responsibleFor})
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
