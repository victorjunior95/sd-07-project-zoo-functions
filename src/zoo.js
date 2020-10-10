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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(animal => (animal.id === ids[0] || animal.id === ids[1]));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(currentAnimal => currentAnimal.name === animal);
  return species.residents.every(currentSpecies => (currentSpecies.age > age));
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find(currentEmployee => (
    currentEmployee.firstName === employeeName ||
    currentEmployee.lastName === employeeName
  ));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const managerIds = employees.map(currentEmployee => currentEmployee.managers).flat();
  return managerIds.some(currentId => currentId === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  const objectAnimals = {};
  animals.forEach((currentAnimal) => {
    objectAnimals[currentAnimal.name] = currentAnimal.residents.length;
  });
  return typeof species === 'undefined' ? objectAnimals : objectAnimals[species];
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
