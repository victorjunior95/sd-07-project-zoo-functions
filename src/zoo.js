const { animals, employees } = require('./data');
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

function animalsByIds(ids, ...rest) {
  // seu código aqui
  const selectedAnimals =
  animals.filter((animal = []) => animal.id === ids || animal.id === rest[0]);
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const selected = animals.filter(species => species.name === animal);
  const result = selected[0].residents.every(iterator => iterator.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  const result = data.employees.map(iterator =>
  iterator.managers.some(element => element === id));
  return result.includes(true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = ' ') {
  // seu código aqui
  if (species === ' ') {
    const result = {};
    data.animals.map(animal => result[animal.name] = animal.residents.length).sort();
    return result;
  }
  const dataAnimal = data.animals.find(animal => animal.name === species);
  return dataAnimal.residents.length;
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
