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
  const animalsObj = ids.map(uniqueId =>
    data.animals.find(animal => animal.id === uniqueId),
  );
  return ids ? animalsObj : [];
}

function animalsOlderThan(animal, age) {
  const typeAnimalFound = data.animals.find(
    eachAnimal => eachAnimal.name === animal,
  );
  return typeAnimalFound.residents.every(
    residentAnimal => residentAnimal.age >= age,
  );
}

function employeeByName(employeeName) {
  const objectEmployee = data.employees.find(
    employee =>
      employee.firstName === employeeName || employee.lastName === employeeName,
  );
  return employeeName ? objectEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  const result = data.employees.some(employee =>
    employee.managers.some(managerId => managerId === id),
  );
  return result;
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
