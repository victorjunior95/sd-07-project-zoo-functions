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
  const { animals } = data;
  return ids.map(id => animals.find(item => item.id === id));
}

function animalsOlderThan(animal, age) {
  const { animals: animalList } = data;
  const { residents } = animalList.find(animalItem => animalItem.name === animal);
  return residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  const employeeData = employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
  return employeeData === undefined ? {} : employeeData;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const employee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(employee);
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
