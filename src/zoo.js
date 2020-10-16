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

const { animals } = require('./data');

const { employees } = require('./data');

const { prices } = require('./data');

const { hours } = require('./data');

const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(animal => ids.find(id => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalObject = animals.find(specie => specie.name === animal);
  return animalObject.residents.every(individuo => individuo.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') return {};
  return employees.find(employee => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some(emp => emp.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmp = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmp);
}

function animalCount(species) {
  // seu código aqui
  if (typeof species === 'undefined') {
    const newObj = {};
    animals.forEach((animal) => {
      newObj[animal.name] = animal.residents.length;
    });
    return newObj;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) return 0;
  const newArray = Object.entries(entrants);
  return newArray.reduce((acc, array) => (acc += prices[array[0]] * array[1]), 0);
}

function animalMap(options) {
  // seu código aqui
}

const auxSchedule = (day) => {
  if (day === 'Monday') return 'CLOSED';
  return `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
};
function schedule(dayName) {
  // seu código aqui
  const newObj = {};
  if (typeof dayName === 'undefined') {
    Object.keys(hours).forEach((day) => { newObj[day] = auxSchedule(day); });
  } else newObj[dayName] = auxSchedule(dayName);
  return newObj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const specie = employees.find(idEmp => idEmp.id === id).responsibleFor[0];
  const residents = animals.find(animal => animal.id === specie).residents;
  return Object.values(residents.reduce((acc, curr) => (acc.age > curr.age ? acc : curr)), 0);
}

function increasePrices(percentage) {
  // seu código aqui
  const newArray = Object.keys(prices);
  newArray.forEach((type) => {
    const newValue = prices[type] + ((prices[type] * percentage) / 100);
    prices[type] = Math.round(newValue * 100) / 100;
  });
  return prices;
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
