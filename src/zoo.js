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
  let listOfAnimals = [];
  if (ids !== undefined) {
    listOfAnimals = data.animals.filter(
      (animal, index) => animal.id === ids[index],
    );
  }

  return listOfAnimals;
}

function animalsOlderThan(animal, age) {
  const requiredAnimal = data.animals.filter(element => element.name === animal);
  return requiredAnimal[0].residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  let employeeObject = {};
  if (employeeName !== undefined) {
    employeeObject = data.employees.find(employee =>
    (employee.firstName === employeeName || employee.lastName === employeeName));
  }
  return employeeObject;
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
