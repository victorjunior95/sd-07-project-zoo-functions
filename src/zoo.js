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
  const animalsWithId = [];
  ids.forEach((id) => {
    animalsWithId.push(animals.find(animal => animal.id === id));
  });
  return animalsWithId;
}

function animalsOlderThan(animal, age) {
  return animals.find(species => species.name === animal)
  .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const employeeObject = {};
  Object.assign(employeeObject, employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName));
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return id === '0e7b460e-acf4-4e17-bcb3-ee472265db83';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const personalInfo = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(personalInfo);
}

function animalCount(species) {
  let animalQuantities = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  if (species !== undefined) {
    animalQuantities = animals
    .find(animal => animal.name === species)
    .residents
    .length;
  }
  return animalQuantities;
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
