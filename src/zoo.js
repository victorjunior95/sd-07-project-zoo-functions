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

const { animals } = require('./data');
const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(specie => ids
    .some(id => id === specie.id));
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.find(specie => specie.name === animal)
    .residents.every((resident => resident.age >= age));
  return getAnimal;
}

function validateEmployeeName(employee, employeeName) {
  return (employee.firstName === employeeName) || (employee.lastName === employeeName);
}

function employeeByName(employeeName) {
  const noParams = {};
  if (!employeeName) return (noParams);

  const getEmployee = employees.find(employee => validateEmployeeName(employee, employeeName));
  return getEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  const validateId = employees.some(employee => employee.managers
    .find(idAtual => idAtual === id));
  return validateId;
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
