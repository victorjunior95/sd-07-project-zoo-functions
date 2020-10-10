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

const { animals, employees, prices } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

function animalsOlderThan(animal, age) {
  const foundAnimals = animals.find(element => element.name === animal);
  const residentAnimals = foundAnimals.residents;
  return residentAnimals.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees
    .find(employee =>
    employee.firstName.includes(employeeName) ||
    employee.lastName.includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
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
  percentage /= 100;
  const calc = (type, perc) => type * perc;
  const { Adult, Senior, Child } = prices;
  prices.Adult = parseFloat(calc(Adult, percentage) + Adult).toFixed(2);
  prices.Senior = parseFloat(calc(Senior, percentage) + Senior).toFixed(2);
  prices.Child = parseFloat(calc(Child, percentage) + Senior).toFixed(2);
  return prices;
}

console.log(increasePrices(50));

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
