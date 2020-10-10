const { animals, employees } = require('./data');
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
  const zooAnimal = [];
  ids.forEach((element) => {
    zooAnimal.push(animals.find(a => a.id === element));
  });
  return zooAnimal;
}

function animalsOlderThan(animal, age) {
  const thisBuddy = animals.find(an => an.name === animal);
  const oldBuddy = thisBuddy.residents.every(they => they.age > age);
  return oldBuddy;
}

function verifyUndefined(arg) {
  if (arg === undefined) return false;
  return true;
}

function employeeByName(employeeName) {
  let zooEmployee = {};
  const a = employees.find(em => em.firstName === employeeName);
  const b = employees.find(em => em.lastName === employeeName);
  if (verifyUndefined(a)) zooEmployee = a;
  if (verifyUndefined(b)) zooEmployee = b;
  return zooEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const thisEmployee = { ...personalInfo, ...associatedWith };
  return thisEmployee;
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
