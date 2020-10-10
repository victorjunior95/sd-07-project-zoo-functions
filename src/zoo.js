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

const [animals, employees] = [data.animals, data.employees];

const animalsByIds = (...ids) => ids.map(id => animals.find(animal => id === animal.id));

const animalsOlderThan = (animal, age) => animals.find(element =>
  element.name === animal).residents.every(element => element.age >= age);

const nameOrLast = nam => employees.find(element =>
  element.firstName === nam || element.lastName === nam);

const employeeByName = employeeName => (employeeName === undefined ? {} : nameOrLast(employeeName));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees.some(element => element.managers.includes(id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const obj = { id, firstName, lastName, managers, responsibleFor };
  Object.entries(obj).forEach((element) => { obj[element[0]] = element[1]; });
  // for (let nam in obj) { nam = obj[nam] };
  employees.push(obj);
};

function animalCount(species) {
  /** Sem parâmetros, retorna animais e suas quantidades
Com o nome de uma espécie de animal, retorna somente a quantidade */

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
