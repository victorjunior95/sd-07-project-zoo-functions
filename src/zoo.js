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

const animals = data;
function animalsByIds(ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals.find(animalOfZoo => animal === animalOfZoo.name)
  .residents.every(animalOfZoo => animalOfZoo.age > age);
}
function employeeByName(employeeName) {
  const employees = {};
  if (!employeeName) return {};
  return employees.find(employee => employee.firstName ===
  employeeName || employee.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const employees = {};
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employees = {};
  const addNewEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals
      .reduce((acc, current) => ({
        acc,
        [current.name]: current.residents.length,
      }), {});
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  const prices = {};
  const {
    Adult = 0, Child = 0, Senior = 0,
  } = entrants;
  const [adultPrice, seniorPrice, childPrice] = Object.values(prices);
  const sumOfPrices = (Adult * adultPrice) + (Senior * seniorPrice) + (Child * childPrice);
  return sumOfPrices;
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
