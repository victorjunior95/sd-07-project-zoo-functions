const { employees } = require('./data');
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

function animalsByIds(ids) {
  // seu código
}

function animalsOlderThan(animal, age) {
  const result = animal.every(element => element >= name.age);
  return result;
}

function employeeByName(employeeName) {
  const obj = {};

  if (employeeName === '') {
    return obj;
  } else if (employeeName === employees.firstName) {
    const firstName = employees.find(employeeName => employeeName.firstName === employeeName);
    return firstName;
  } else if (employeeName === employees.lastName) {
    const lastName = employees.find(employeeName => employeeName.lastName === employeeName);
    return lastName;
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
