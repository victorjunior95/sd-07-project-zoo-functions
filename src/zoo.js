/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    const error = [];
    return error;
  }
  const result = [];
  ids.forEach((item) => {
    const newItem = data.animals.find(element => element.id === item);
    result.push(newItem);
  });
  return result;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const someAnimal = data.animals.find(element => element.name === animal);
  const validation = someAnimal.residents.every(
    resident => resident.age >= age
  );
  return validation;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    const error = [];
    return error;
  }
  const result = data.employees.find(
    element =>
      element.firstName === employeeName || element.lastName === employeeName
  );
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: managers,
    responsibleFor: responsibleFor,
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
