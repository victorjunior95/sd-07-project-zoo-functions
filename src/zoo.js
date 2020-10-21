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
// const { animals } = require('./data');
// const { animals, employees } = require('./data');

// troquei o find pelo filter conforme visto no PR https://github.com/tryber/sd-07-project-zoo-functions/blob/b32b8ea4021741b40898532cb96353589bf71e60/src/zoo.js
function animalsByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  return data.animals.filter(element => ids.includes(element.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(element => animal.includes(element.name))
    .every((element) => element.residents.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(element =>
    employeeName.includes(element.firstName) || employeeName.includes(element.lastName));
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
  if (!species) {
    // criar objeto que retorne name: popularity.
  }
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // if (!options) {
  //   const noParamater = new Object
  // }
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
