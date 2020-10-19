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
  // Versao Tunada em aula e ingles!!!
  const compare = data.animals.filter(animal => ids.includes(animal.id));
  return compare;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const catchAnimals = data.animals.filter(species => species.name === animal);
  const olderThan = catchAnimals[0].residents.every(older => older.age >= age);
  return olderThan;
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { firstName, lastName, id } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const plusEmployee = { firstName, id, lastName, managers, responsibleFor };
  return plusEmployee;
}
function isManager(id) {
  // try hard my friend
  const compareId = ['error', { skipBlankLines: true }];
  data.employees.map(grup => grup.managers.forEach(grupElement => compareId.push(grupElement)));
  const cathId = compareId.some(grup => grup === id);
  return cathId;
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
