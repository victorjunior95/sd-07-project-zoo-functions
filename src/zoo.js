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
  if (ids.length === 0) {
    return [];
  }
  const animalById = data.animals.filter((animal, index) => animal.id === ids[index]);
  return animalById;
}

function animalsOlderThan(animal, age) {
  let minAge = false;
  const animalName = data.animals.find(species => species.name === animal);
  animalName.residents.forEach((resident) => {
    resident.age >= age ? minAge = true : minAge = false;
  });
  return minAge;
}

function employeeByName(employeeName = '') {
  const employee = employeeName;
  const askedEmployee = data.employees.find((employee) => {
   return employee.firstName === employeeName || employee.lastName === employeeName;
  });
  
  if (employee.length === 0) {
    return {}
  }
  return askedEmployee;
}

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
