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
  return ids.map(string => data.animals.find(object => object.id === string));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(object => object.name === animal)
    .residents.every(object => object.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof (employeeName) === 'undefined') return {};
  return data.employees.find(object =>
    object.firstName === employeeName || object.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
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
  return data.employees.some(object => object.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // seu código aqui
  // créditos MDN Web Docs pelo Object.fromEntries
  let result;
  const array = data.animals.map(object => [object.name, object.residents.length]);
  result = Object.fromEntries(array);
  if (typeof (species) !== 'undefined') {
    result = data.animals
      .find(object => object.name === species)
      .residents
      .length;
  }
  return result;
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
