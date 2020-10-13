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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents.every(i => i.age >= age);
}

function employeeByName(emp) {
  if (!emp) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === emp || lastName === emp);
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
  return data.employees.some(sereal => sereal.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    const geral = {};
    data.animals.forEach(({ name, residents }) => {
      geral[name] = residents.length;
    });
    return geral;
  }

  const escolido = data.animals.find(({ name }) => name === species);
  const { residents } = escolido;
  return residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  // necessário multiplicar valores do obj.
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
  return data.prices.forEach( price => price * ((percentage / 100) + 1))
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
