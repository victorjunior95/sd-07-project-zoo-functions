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

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalList = data.animals.find(element => element.name = animal)

  const ageCheck = animalList.residents.reduce((acc, currentValue) => currentValue.age < age ? acc + 1 : acc, 0);

  if (ageCheck > 0) {
    return false;
  }

  return true;
}

function employeeByName(employeeName) {
  // seu código aqui
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
