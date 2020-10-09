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

const { employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.reduce((acc, id) => acc.concat(data.animals.find((animal) => animal.id === id)), []);
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find((creature) => creature.name === animal);
  return findAnimal.residents.every((isOlder) => isOlder.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName
  );
}

function createEmployee(personalInfo, associatedWith) {
  const { firstName, id, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { firstName, id, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some(
    (employee) => employee.id === id && employee.responsibleFor.length >= 4
  );
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function animalCount(species) {
  if (!species)
    return Object.fromEntries(data.animals.map((animal) => [animal.name, animal.residents.length]));
  const specieData = data.animals.find((animal) => animal.name === species);
  return specieData.residents.length;
}

function entryCalculator(entrants = 0) {
  let finalValue = 0;
  if (entrants.Adult) finalValue += data.prices.Adult * entrants.Adult;
  if (entrants.Senior) finalValue += data.prices.Senior * entrants.Senior;
  if (entrants.Child) finalValue += data.prices.Child * entrants.Child;
  return finalValue;
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
