const { animals } = require('./data');
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
  const id = [...ids];
  const scanId = animals.filter(animal => animal.id === id[0] || animal.id === id[1]);
  return scanId;
}

function animalsOlderThan(animal, age) {
  const jaula = animals.find(animalo => animalo.name === animal);
  const idades = jaula.residents.every(bixos => bixos.age >= age);
  return idades;
}

function employeeByName(employeeName) {
  const nomes = data.employees;
  const nome = nomes.filter(n => n.firstName === employeeName || n.lastName === employeeName);
  if (nome[0] === undefined) {
    return {};
  }
  return nome[0];
}

function createEmployee(personalInfo, associatedWith) {
  
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
