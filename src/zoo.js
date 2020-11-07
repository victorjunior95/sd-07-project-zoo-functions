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
  const emp = data.employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
  return emp;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
