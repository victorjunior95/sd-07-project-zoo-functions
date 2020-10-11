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
  return data.animals.filter((item, count) => item.id === ids[count]);
}

function animalsOlderThan(animal, age) {
  const selectedAnimal = data.animals.filter(item => item.name === animal);
  const selectedAnimalContent = selectedAnimal[0].residents;
  return selectedAnimalContent.every(item => item.age > age);
}

function employeeByName(employeeName) {
  const name = employeeName;
  if (name !== undefined) {
    return data.employees.find(item => item.firstName === name || item.lastName === name);
  }
  return ({});
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  const getId = (data.employees.map(item => item.managers)).flat();
  return getId.some(item => item === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species !== undefined) {
    return data.animals.find(item => item.name === species).residents.length;
  }
  return data.animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants !== undefined && entrants !== {}) {
    const entrantsKeys = Object.keys(entrants);
    return entrantsKeys.reduce((acc, key) => {
      acc += entrants[key] * data.prices[key];
      return acc;
    }, 0);
  }
  return 0;
}

function animalMap(options) {
  // seu código aqui
}


function schedule(dayName) {

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
