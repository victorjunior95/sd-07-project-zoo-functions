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
  /* Code Climate não aceitou a primeira solução
  return data.animals.filter((zoo, index) => ids === [] ? [] : zoo.id === ids[index]); */
  if (ids === []) {
    return [];
  }
  return data.animals.filter((zoo, index) => zoo.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals.some(zoo => zoo.name === animal &&
  zoo.residents.every(res => res.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(manger => manger.id === id && manger.managers.length === 1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const nameAnimals = data.animals.map(({ name }) => name);
  const countAnimals = data.animals.map(({ residents }) => residents.length);
  const obj = {};
  if (species === undefined) {
    for (let index = 0; index < nameAnimals.length; index += 1) {
      obj[nameAnimals[index]] = countAnimals[index];
    }
    return obj;
  }
  return data.animals.filter(({ name }) => name === species).map(reside => reside.residents.length)
  .reduce((acc, arr) => acc + arr, 0);
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, arr) => data.prices[arr[0]] * arr[1], 0);
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
