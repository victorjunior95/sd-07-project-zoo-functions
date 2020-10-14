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
// Requisito 1 - OK
function animalsByIds(...rest) {
  // seu código aqui

  const animalList = [];
  if (rest === undefined) {
    return [];
  }
  rest.forEach((id) => {
    animalList.push(data.animals.find(element => element.id === id));
  });
  return animalList;
}
// Requisito 2 - OK
function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalList = data.animals.find(element => element.name === animal).residents;

  const ageVer = animalList.reduce((acc, curr) => {
    if (curr.age < age) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (ageVer > 0) {
    return false;
  }

  return true;
}
// Requisito 3 - OK
function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  const empName = employeeName;

  const empData = data.employees;

  const empObj = empData.find(emp => emp.firstName === empName || emp.lastName === empName);

  return empObj;
}
// Requisito 4 - On Going
function createEmployee (personalInfo, associatedWith) {
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
