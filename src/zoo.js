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

const [animals, employees] = [data.animals, data.employees];

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find(element =>
    element.name === animal).residents.every(element => element.age >= age);
}

const nameOrLast = nam => employees.find(element =>
  element.firstName === nam || element.lastName === nam);

function employeeByName(employeeName) {
  return employeeName === undefined ? {} : nameOrLast(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // Cria um novo colaborador a partir de objetos contendo informações pessoais e gerentes e animais gerenciados.
 return { ...personalInfo, ...associatedWith};
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
