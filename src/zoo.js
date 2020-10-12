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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animalName, ageAnimal) {
  return data.animals
    .find(animal => animal.name === animalName).residents.every(animal => animal.age > ageAnimal);
}

function employeeByName(...employeeName) {
  if (employeeName.length === 0) {
    return {};
  }
  return data.employees.find(employee =>
        employeeName.includes(employee.firstName) || employeeName.includes(employee.lastName));
}

function createEmployee(personalInfo, ...associatedWith) {
  const newObt = {};
  return Object.assign(newObt, personalInfo, ...associatedWith);
}

function isManager(id) {
  const checkIdManager = data.employees.map(manager => manager.managers).toString();
  return checkIdManager.includes(id);
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
