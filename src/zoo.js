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
// const objectAnimal = data.animals.filter(animal => animal.name === 'lions');
// console.log(objectAnimal);
// const arrayResidents = objectAnimal[0].residents;
// console.log(arrayResidents);
// const arrayAges = arrayResidents.map(animal => animal.age);

// const arrayAges = objectAnimal[0].residents.map(animal => animal.age);
// console.log(arrayAges);
// console.log(objectAnimal[0].residents.map(animal => animal.age).every(age => age >= 10));

function animalsOlderThan(animal, age) {
  const objectAnimal = data.animals.filter(species => species.name === animal);
  const arrayAges = objectAnimal[0].residents.map(speciesAge => speciesAge.age);
  return arrayAges.every(animalAge => animalAge >= age);
}
// console.log(animalsOlderThan('otters', 7));
// console.log(employee);

function employeeByName(employeeName) {
  const employee = data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
  if (typeof employee === 'object') return employee;
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
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
