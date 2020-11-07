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
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(it => it.name === animal).residents.every(el => el.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employee = data.employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
  return employee;
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

// function retrieveAvailableLocations() {
//   return ['NE', 'E', 'NW', 'SW', 'SE'];
// }

// function retrieveAnimalsPerLocation(locations) {
  // const animalsPerLocation = {};

  // locations.forEach((location) => {
  //   const filteredAnimals = animals
  //   .filter((animal) => animal.location === location ).map((animal) => animal.name);
  //   console.log(`Localização: ${location}`);
  //   console.log(filteredAnimals);
  // });
// }

function animalMap(options) {
  // const locations = retrieveAvailableLocations();

  // if (!options)
  //   return retrieveAnimalsPerLocation(locations);
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
