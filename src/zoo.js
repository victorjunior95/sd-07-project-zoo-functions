const { animals } = require('./data');
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
  const paramIds = ids.map((id) => {
    const comparingIds = animals.find(animalById => animalById.id === id);
    return comparingIds;
  });
  return paramIds;
}

function animalsOlderThan(animal, age) {
  const getingParamAnimal = animals.find(animalParam => animalParam.name === animal);
  return getingParamAnimal.residents.every(animalsAges => animalsAges.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const allemployeeInfos = data.employees.find((allInfos) => {
    return allInfos.firstName === employeeName || allInfos.lastName === employeeName
  });
  return allemployeeInfos;
}

function createEmployee(personalInfo, associatedWith) {

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
