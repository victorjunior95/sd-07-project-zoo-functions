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

function animalsByIds(identifyer, ...ids) {
  if (identifyer === undefined) {
    return [];
  }
  if (ids.length === 0) {
    return animals.filter(animal => animal.id === identifyer);
  }
  return null;
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  // Sem parâmetros, retorna um objeto vazio {OK}
  if (employeeName === undefined) {
    return {};
  }
  // Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  if (employees.some(employee => employee.firstName === employeeName)) {
    return employees.find(employee => employee.firstName === employeeName);
  }
  // Quando provido o último nome do funcionário, retorna o objeto do funcionário
  if (employees.some(employee => employee.lastName === employeeName)) {
    return employees.find(employee => employee.lastName === employeeName);
  }
  return null;
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
