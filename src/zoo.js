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
  let species = [];
  if (ids.length > 0) {
    species = data.animals.filter(animal => ids.includes(animal.id));
    return species;
  }
  return species;
}

function animalsOlderThan(animal, age) {
  let animalsAge;
  for (let i = 0; i < data.animals.length; i += 1) {
    if (data.animals[i].name === animal) {
      animalsAge = data.animals[i].residents.every(animalAge => animalAge.age > age);
    }
  }
  return animalsAge;
}

function employeeByName(employeeName) {
  let employeeObj = {};
  if (typeof employeeName === 'undefined') {
    return employeeObj;
  }
  employeeObj = data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const managerId = data.employees.some(employeeId => employeeId.managers.includes(id));
  return managerId;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeObjct = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employeeObjct);
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
