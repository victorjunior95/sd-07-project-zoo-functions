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

// const { animals } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const animalsId = [];
  if (ids.length === 0) {
    return [];
  }
  ids.forEach(id => animalsId.push(data.animals.find(element => element.id === id)));
  return animalsId;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(an => an.name === animal).residents.every(ag => ag.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return { };
  }
  return data.employees.filter(e => e.firstName === employeeName || e.lastName === employeeName)[0];
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
  const managerList = [];

  for (let i = 0; i < data.employees.length; i += 1) {
    for (let k = 0; k < data.employees[i].managers.length; k += 1) {
      managerList.push(data.employees[i].managers[k]);
    }
  }

  return managerList.some(e => e === id);
}

for (let i = 0; i < data.employees.length; i += 1) {
  console.log(isManager(data.employees[i].id));
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
