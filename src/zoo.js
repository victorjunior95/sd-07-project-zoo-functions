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

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find(element => element.name === `${animal}`);
  return findAnimal.residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employee => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {

}

function isManager(id) {
  return data.employees.some(employee => employee.managers.includes(`${id}`));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    //
  }
  return data.animals.filter(animal => animal.name === species)
    .map(animal => animal.residents.length)[0];
}

function entryCalculator(entrants) {
  if ((entrants === undefined) || (entrants === {})) {
    return 0;
  }
  const keys = Object.keys(entrants);
  return keys.reduce((acc, curr) => (acc += (entrants[curr] * data.prices[curr])), 0);
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
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = Math.round((1 + (percentage / 100)) * Adult * 100) / 100;
  data.prices.Senior = Math.round((1 + (percentage / 100)) * Senior * 100) / 100;
  data.prices.Child = Math.round((1 + (percentage / 100)) * Child * 100) / 100;
  return data.prices;
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
