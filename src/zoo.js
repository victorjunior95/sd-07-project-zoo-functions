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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids === null) return [];
  const answer = [];
  ids.forEach(id => answer.push(animals.filter(animal => animal.id === id)[0]));
  return answer;
}

function animalsOlderThan(animal, age) {
  const ages = animals.filter(animalIndex => animalIndex.name === animal)[0];
  if (ages.residents.find(residents => residents.age < age)) return false;
  return true;
}

function nameEmployee(employee, employeeName) {
  if (employee.firstName === employeeName) return true;
  if (employee.lastName === employeeName) return true;
  return false;
}

function employeeByName(employeeName) {
  if (employeeName === null) return {};
  return employees.find(employee => nameEmployee(employee, employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers) {
  // seu código aqui (responsibleFor)
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
