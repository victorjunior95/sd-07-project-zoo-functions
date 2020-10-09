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

function animalsByIds(...ids) {
  let animalsList = [];
  if (ids === []) {
    animalsList = [];
  } else {
    ids.forEach((id) => {
      const animalByIdList = data.animals.filter(animal => animal.id === id);
      animalsList = animalsList.concat(animalByIdList);
    });
  }
  return animalsList;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(animalObject => animalObject.name === animal);
  return animals.residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  let employeeObject = null;
  if (employeeName === undefined) {
    employeeObject = {};
  } else {
    employeeObject = data.employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return employeeObject;
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
