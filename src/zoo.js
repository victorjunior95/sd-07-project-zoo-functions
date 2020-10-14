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

const animalsByIds = (...ids) => {
  let arrReturned = [];
  arrReturned = ids.map(id => data.animals.find(animal => animal.id === id));
  return arrReturned;
};

const animalsOlderThan = (animal, age) => {
  const animalsResidents = data.animals.find(element => element.name === animal).residents;
  return animalsResidents.every(resident => resident.age >= age);
};

const employeeByName = (employeeName) => {
  let obj = {};
  if (typeof employeeName === 'string') {
    const { employees: arr } = data;
    obj = arr.find(({ firstName: a, lastName: b }) => a === employeeName || b === employeeName);
  }
  return obj;
};

const createEmployee = (personalInfo, associatedWith) => {
  return { ...personalInfo, ...associatedWith };
};

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
