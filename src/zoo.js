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

const animalsByIds = (...ids) => data.animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => data.animals
  .find(animalName => animalName.name === animal)
  .residents.every(animalAge => animalAge.age >= age);

const employeeByName = (employeeName) => {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(({ firstName, lastName }) =>
    employeeName === firstName || employeeName === lastName);
  // Solução encontrada após tirar dúvida no slack.
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// Função createEmployee passou no code climate com ajuda do Isaac Batista no slack.

const isManager = id => data.employees.some(manager => manager.managers.includes(id));

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
