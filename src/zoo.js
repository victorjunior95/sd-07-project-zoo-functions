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
  // seu código aqui
  return data.animals.filter(animal => ids.includes(animal.id));
  /*
  if (arguments.length === 0) {
    return [];
  } else if (arguments.length === 1) {
    const result = data.animals.find(animal => animal.id === arguments, 0);
    return [result];
  } else if (arguments.length === 2) {
    const result = data.animals.find(animal => animal.id === arguments, 0);
    const result2 = data.animals.find(animal => animal.id === arguments, 1);
    return [result, result2];
  }
  return;
  */
}

function animalsOlderThan(species, age) {
  // seu código aqui
  const mySpecie = data.animals.find(animal => species.includes(animal.name));
  const mySpecieOlder = mySpecie.residents.every(animal => animal.age >= age);
  return mySpecieOlder;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName) {
    const filterResult = data.employees.find(e =>
      e.firstName === employeeName || e.lastName === employeeName);
    return filterResult;
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  if (personalInfo && associatedWith) {
    data.employees.push({ ...personalInfo, ...associatedWith });
  }
  const lastEmployee = data.employees.length - 1;
  const newEmployee = data.employees[lastEmployee];
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  if(id){
    const findEmployees = data.employees.find(employees =>employees.id=== id);
    return findEmployees.managers.includes('9e7d4524-363c-416a-8759-8aa7e50c0992');
  }
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
