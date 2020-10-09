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


/* PRIMEIRO COMMIT */
function animalsByIds(...ids) {
  const animalById = animalId => data.animals.filter(({ id }) => id === animalId);
  let animalsList = [];
  if (ids.length > 0) {
    animalsList = ids.reduce((acc, id) => [...acc, ...animalById(id)], []);
  }
  return animalsList;
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(({ name }) => name === animal)
    .residents
    .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const employeeFound = {};
  if (employeeName) {
    return data.employees
      .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  }
  return employeeFound;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
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
