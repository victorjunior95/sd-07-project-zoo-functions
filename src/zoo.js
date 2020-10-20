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
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
    .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(name => name.firstName === employeeName ||
    name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  // if (!species){
  //   //retorna animais e suas quantidades
  //   return data.animals.reduce((animalAcc, animalCurrent) => 
  //   Object.assign);
  // }
  // //Com o nome de uma espécie de animal, retorna somente a quantidade
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // if (!options) {
  //   //categorizeAnimalsByLocation()
  // }
}

// const objetoInicial = {
  // NE: [],
  // NW: [],
  // SE: [],
  // SW: [],
// }

// function categorizeAnimalsByLocation() {
//   // return data.animals.reduce((acc, specie) => {
//   //   return {
//   //     ...acc,
//   //     [specie.location]: [
//   //       ...acc[specie.location],
//   //       specie.name
//   //     ]
//   //   };
//   // }, objetoInicial);
// }

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
