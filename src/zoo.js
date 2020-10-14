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

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
