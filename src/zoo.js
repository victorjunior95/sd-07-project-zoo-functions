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
  if (ids === undefined) {
    return [];
  }
  return ids.map(id => data.animals.find(animal => animal.id === id));
  // const result = data.animals.filter(element => ids.find((item) => {
  //   // if (element.id === item) {
  //   //   return element;
  //   // }
  //   // return undefined;
  //   return element.id === item;
  // }));
}
function animalsOlderThan(animal, age) {
  const animalType = data.animals.find(element => element.name === animal);
  return animalType.residents.every(elem => elem.age >= age);
}
//  suporte para a função employeeByName(), diminuindo assim sua complexidade.
const fname = employeeName => data.employees.find(name => name.firstName === employeeName);
const lname = employeeName => data.employees.find(name => name.lastName === employeeName);
function employeeByName(employeeName) {
  if (employeeName === undefined) { return {}; }
  return fname(employeeName) || lname(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
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
