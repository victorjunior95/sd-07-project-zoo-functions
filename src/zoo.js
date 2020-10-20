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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter(animal => ids.includes(animal.id));
  // return id.filter(animalId => animalId.id == ids) !! PK NAO FUNCIONA ASSIM? !!
  // return id.filter(animalId => animalId.id.includes(ids)) !! PK NAO FUNCIONA ASSIM? !!
}

function animalsOlderThan(animal, age) {
  const species = animals.find(specie => specie.name === animal);
  return species.residents.every(resAnimal => resAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}
console.log(employeeByName('Wishart'))

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
