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
const { animals, employees, prices } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter(animal => ids.includes(animal.id));

const animalsOlderThan = (animal, age) => data.animals.find(especie => especie.name === animal)
.residents.every(indice => indice.age > age);

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(indice => (
    indice.firstName === employeeName || indice.lastName === employeeName));
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

const animalList = () => {
  const resultObj = {};
  animals.forEach(({ name, residents }) => {
    resultObj[name] = residents.length;
  });
  return resultObj;
};

const animalCount = (animal) => {
  if (animal === undefined) return animalList();
  return animals.find(element => element.name === animal).residents.length;
};

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  return Object.entries(entrants)
    .reduce((acumulator, [person, elementPrice]) =>
    (acumulator += prices[person] * elementPrice), 0);
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

const increasePrices = (percentage) => {
  Object.keys(prices)
  .forEach((elementPrice) => {
    prices[elementPrice] =
    Math.ceil((prices[elementPrice] * (100 + percentage))) / 100;
  });
};

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
