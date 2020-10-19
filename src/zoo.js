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
  if (typeof ids === 'undefined') {
    return [];
  }
  const idAnimals = data.animals.filter(animal => ids.includes(animal.id));
  return idAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.filter(animalName => animalName.name === animal);
  const olderAnimals = findAnimal[0].residents.every(animalAge => animalAge.age > age);
  return olderAnimals;
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') {
    return {};
  }
  const findEmployee = data.employees
  .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  return findEmployee;
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
  const findManager = data.employees.some(employee => employee.managers.includes(id));
  return findManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employeeAdd = data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employeeAdd;
}

function animalCount(species) {
  const object = {};
  if (typeof species === 'undefined') {
    data.animals.forEach((animal) => {
      object[animal.name] = animal.residents.length;
    });
    return object;
  }
  const findCount = data.animals.find(kind => kind.name === species).residents.length;
  return findCount;
}

function entryCalculator(entrants) {
  // seu código aqui!
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
