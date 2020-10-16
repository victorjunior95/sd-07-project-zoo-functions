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

// const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const speciesById = data.animals.filter(animal => ids.includes(animal.id));
  return speciesById;
}

function animalsOlderThan(animal, age) {
  const choosenSpecies = data.animals.find(species => species.name === animal);
  const testsAge = choosenSpecies.residents.every(testAge => testAge.age >= age);
  return testsAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const EmployeeObject = data.employees.find(
    name => name.firstName === employeeName ||
    name.lastName === employeeName);
  return EmployeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const testsManager = data.employees.some(test => test.managers.includes(id));
  return testsManager;
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
