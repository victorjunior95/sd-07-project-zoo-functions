const { employees } = require("./data");
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

const data = require("./data");

function animalsByIds(...ids) {
  return data.animals.filter(item => ids.includes(item.id));
}

// function animalsOlderThan(animal, age) {
//   const selectedAnimal = data.animals.filter(name => name === animal);
//   console.log(selectedAnimal);
// }

// animalsOlderThan('otters', 7);

function employeeByName(employeeName) {
  const { employees } = data;
  const findEmployee = elem => elem.firstName === employeeName || elem.lastName === employeeName;
  const employee = employees.find(findEmployee);
  return (typeof employeeName !== 'undefined' ? employee : {});
};

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
  // animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
