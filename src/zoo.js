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
  return ids.map((id) => {
    const animalId = data.animals.find(animal => animal.id === id);
    return animalId;
  });
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalData = data.animals.find(item => item.name === animal);
  const ageOfAnimals = animalData.residents.every(item2 => item2.age >= age);
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') {
    return {};
  }
  const findEmployees = data.employees.find(item =>
    item.firstName === employeeName || item.lastName === employeeName);
  return findEmployees;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
  /* const managerVerify = data.employees.some(item => item.managers.includes(id));
  return managerVerify; */
  const managerVerify = data.employees.some((item, index) => item.managers[index] === id);
  return managerVerify;
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
