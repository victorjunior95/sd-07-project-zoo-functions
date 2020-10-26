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
const { employees } = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find(element => element.name === animal).residents
    .every(element => element.age >= age);
}
// Estava fazendo o return com animals e o every direto do residents e não estava passando no teste. Consultei o PR do colega Dilênio (PR: https://github.com/tryber/sd-06-project-zoo-functions/blob/17c91ef46c3fd1059fe8a903b6514b3a1164f551/src/zoo.js)


function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const nEmployee = { ...personalInfo, ...associatedWith };
  return nEmployee;
}

function isManager(id) {
  return employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species !== undefined) {
    return data.animals
      .find(item => item.name === species).residents.length;
  }
  return data.animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) return 0;
  const { Child = 0, Adult = 0, Senior = 0 } = entrants;
  const childTicket = data.prices.Child * Child;
  const adultTicket = data.prices.Adult * Adult;
  const seniorTicket = data.prices.Senior * Senior;
  const total = childTicket + adultTicket + seniorTicket;
  return total;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const employeeResponsible = data.employees
  .filter(element => element.id === id)[0].responsibleFor[0];

  const animalInfo = data.animals
  .filter(element => element.id === employeeResponsible)[0].residents
  .sort((a, b) => b.age - a.age)[0];
  const result = [];
  result.push(animalInfo.name);
  result.push(animalInfo.sex);
  result.push(animalInfo.age);
  return result;
}
// Consultei o PR do colega Dilênio (PR: https://github.com/tryber/sd-06-project-zoo-functions/blob/121e00c3c52263fa818dee1b2b501d781a6a5d53/src/zoo.js) pois ao fazer com Find e Reduce não estava conseguindo e declarando as variáveis e retornando array estava um código muito longo.

function increasePrices(percentage) {
  const keys = Object.keys(data.prices);
  const values = Object.values(data.prices);

  keys.map((key, index) => {
    data.prices[key] = Math.round(values[index] * (1 + (percentage / 100)) * 100) / 100;

    return true;
  });

  return data.prices;
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
