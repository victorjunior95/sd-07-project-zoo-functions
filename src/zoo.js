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
  // seu código aqui
  return data.animals.filter(animais => ids.includes(animais.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const findAnimal = data.animals.filter(element => element.name === animal);
  return findAnimal[0].residents.every(elementos => elementos.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(element =>
    element.firstName === employeeName || element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  data.animals = { ...personalInfo, ...associatedWith };
  const newArray = data.animals;
  return newArray;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers[0] === id || managers[1] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
