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
  if (typeof ids === 'undefined') {
    return [];
  }
  const idAnimals = data.animals.filter(animal => ids.includes(animal.id));
  return idAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.filter(animalName => animalName.name === animal);
  const olderAnimals = findAnimal[0].residents.every(animalAge => animalAge.age > age);
  return olderAnimals;
}

function employeeByName(employeeName) {
  const employees = {};
  if (typeof employeeName === 'undefined') {
    return employees;
  }
  const findEmployee = data.employees
  .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  return findEmployee;
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
  // seu código aqui!
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
