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
const animals = require('./data').animals;
const employees = require('./data').employees;

function animalsByIds(...ids) {
  const out = [];
  ids.forEach(element => out.push(animals.find(animal => animal.id === element)));
  return out;
}

function animalsOlderThan(animal, age) {
  return animals
    .find(element => element.name === animal)
    .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  const out = {};
  Object.assign(
    out,
    employees.find(
      employee => employee.firstName === employeeName || employee.lastName === employeeName,
    ),
  );
  return out;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return Object.assign({}, { id, firstName, lastName, managers, responsibleFor });
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    const out = {};
    animals.forEach(animal => (out[animal.name] = animal.residents.length));
    return out;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  price = 0;
  Object.keys(entrants).forEach(segment => {
    price += data.prices[segment] * entrants[segment];
  });
  return price;
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
