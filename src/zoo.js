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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(name, age) {
  const nameOfAnimal = data.animals.filter(animalName => animalName.name === name);
  const ageOfAnimals = nameOfAnimal[0].residents.every(animalAge => animalAge.age >= age);
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  const nameOfEmployee = (employeeByName === 'undefined') ? {} :
  data.employees.find(empName => (empName.firstName || empName.lastName));
  return nameOfEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, lastName, firstName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = { id, lastName, firstName, managers, responsibleFor };
  return newEmployee;
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
