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
// solução apresentada pelo Murillo Wolf - Instrutor Trybe
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

// parte do código abaixo foi implmantada usando como referencia: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every

const { animals } = require('../src/data');

function animalsOlderThan(animal, age) {
  return animals.find(item => item.name === animal)
  .residents.every(item => item.age >= age);
}

const { employees } = require('../src/data');

function employeeByName(...employeeName) {
  return employees.filter(emp => employeeName.includes(emp.firstName));

}
console.log(employeeByName('Nigel'))


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
